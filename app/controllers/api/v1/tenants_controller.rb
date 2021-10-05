# frozen_string_literal: true

class Api::V1::TenantsController < Api::V1::ApiController
  def join
    logic_call JoinToTenant, tenant_params
  end

  def index
    tenants = Tenant.accessible_by(TenantAbility.new(current_profile), :read)
    json_response(TenantSerializer.new(tenants, { params: { user: @current_user } }).serializable_hash.to_json, :ok,
                  tenants, :not_found, message: 'Tenants not found')
  end

  def accessible
    tenants = Tenant.accessible_by(TenantAbility.new(current_profile), :join)
    json_response(TenantSerializer.new(tenants, { params: { user: @current_user } }).serializable_hash.to_json, :ok,
                  tenants, :not_found, message: 'Tenants not found')
  end

  def show
    if check_system_admin
      tenant = Tenant.find(tenant_params[:id])
      json_response(TenantSerializer.new(tenant, {}).serializable_hash.to_json, :ok, tenant, :not_found,
                    message: 'Domain not found')
    end
  end

  def show_current
    json_response(TenantSerializer.new(@current_profile.tenant, {}).serializable_hash.to_json, :ok,
                  @current_profile.tenant, :not_found, message: 'Domain not found')
  end

  def update_current
    if check_admin
      @current_tenant.update(tenant_params)
      json_response(TenantSerializer.new(@current_tenant, {}).serializable_hash.to_json, :ok, @current_tenant,
                    :not_found, message: 'Domain not found')
    end
  end

  def migrate_avatars
    if check_admin
      profiles = Profile.where(tenant_id: current_tenant.id)
      profiles.each do |profile|
        profile.avatar = profile.user.avatar
        profile.save
      end
    end
  end

  def upload_logo
    if check_admin
      current_tenant.logo = tenant_params[:uploaded_image]
      json_response({ tenant: current_tenant }, :ok) if current_tenant.save
    end
  end

  private

  def tenant_params
    if @current_user && @current_user.system_admin
      params.permit(:id, :domain, :uploaded_image, :name, :caption, :test, :active, :demo, :welcome_points,
                    :welcome_donuts,:tenant_name)
    else
      params.permit(:domain, :uploaded_image, :name, :caption, :welcome_points, :welcome_donuts,:tenant_name)
    end
  end
end
