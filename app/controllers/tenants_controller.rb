class TenantsController < ApiController
    skip_before_action :authenticate_request, :only => [:show_by_domain]

def show_by_domain
    tenant  = Tenant.find_by_domain(tenant_params[:domain]) if tenant_params[:domain]

    json_response(TenantSerializer.new(tenant,{}).serialized_json, :ok, tenant, :not_found,message: 'Domain not found')
end

def migrate_avatars
    if check_admin
        profiles  = Profile.where(tenant_id: current_tenant.id)
        profiles.each do |profile|
            profile.avatar = profile.user.avatar 
            profile.save
        end
    end    
end

def upload_logo
    if check_admin
        current_tenant.logo = tenant_params[:uploaded_image]
        if current_tenant.save
        json_response({ tenant: current_tenant}, :ok)
        end
    end
end


private 
def tenant_params
    params.permit(:domain,:uploaded_image)
end

end