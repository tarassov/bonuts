# frozen_string_literal: true

class TenantsController < ApiController
  skip_before_action :authenticate_request, only: [:show_by_domain]

  def show_by_domain
    if tenant_params[:domain]
      tenant = Tenant.find_by_domain(tenant_params[:domain])
        end

    json_response(TenantSerializer.new(tenant, {}).serialized_json, :ok, tenant, :not_found, message: 'Domain not found')
  end

  def index
    if check_system_admin
      tenants = Tenant.all
      json_response(TenantSerializer.new(tenants, {}).serialized_json)
    end
  end

  def show
   if check_system_admin
    tenant = Tenant.find(tenant_params[:id])
    json_response(TenantSerializer.new(tenant, {}).serialized_json, :ok, tenant, :not_found, message: 'Domain not found')  
   end  
  end

  def show_current
    json_response(TenantSerializer.new(@current_profile.tenant, {}).serialized_json, :ok, @current_profile.tenant, :not_found, message: 'Domain not found')  
  end

  def update
    if check_admin
      @current_tenant.update(tenant_params)
      json_response(TenantSerializer.new(@current_tenant, {}).serialized_json, :ok, @current_tenant, :not_found, message: 'Domain not found')
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
    if @current_user.system_admin
      params.permit(:id, :domain, :uploaded_image, :name, :caption, :test, :active, :demo)
    else
      params.permit(:domain, :uploaded_image, :name, :caption)
  end
end
