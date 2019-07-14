class TenantsController < ApiController
    skip_before_action :authenticate_request, :only => [:show_by_domain]

def show_by_domain
    tenant  = Tenant.find_by_domain(tenant_params[:domain]) if tenant_params[:domain]

    json_response(TenantSerializer.new(tenant,{}).serialized_json, :ok, tenant, :not_found,message: 'Domain not found')
end


private 
def tenant_params
    params.permit(:domain)
end

end