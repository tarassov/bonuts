class TenantPluginsController < ApiController
    include Ability
    before_action :set_plugin, only: %i[update destroy show]
  
    def index
        json_response PluginSerializer.new(TenantPlugin.where(tenant: current_tenant).select(:tenant), { params: {tenant: current_tenant} }).serialized_json
    end

    def create
    end
  
    private
  
  
    def permit_params
      params.permit(:id)
    end
  end
  