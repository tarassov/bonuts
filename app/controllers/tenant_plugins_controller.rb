class TenantPluginsController < ApiController
    include Ability
    before_action :set_plugin, only: %i[update destroy show]
  
    def index
        json_response PluginSerializer.new(TenantPlugin.where(tenant: current_tenant).select(:tenant), { params: {tenant: current_tenant} }).serialized_json
    end

    def create
      operation =  ActivatePlugin.call({
        tenant: @current_tenant,
        profile: @current_profile,
        plugin_id: permit_params[:plugin_id]
      })
      response = operation.response
      if (response.status != :ok)
        render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result }, status: response.status   
      else
        puts response.result
        json_response(PluginSerializer.new(response.result,{ params: {tenant: current_tenant}}).serialized_json, :ok, response.result, :bad_request)
      end  
    end
  
    private
  
  
    def permit_params
      params.permit(:id, :plugin_id, :settings)
    end
  end
  