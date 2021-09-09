class Api::V1::TenantPluginsController < Api::V1::ApiController
  include Ability
  before_action :set_plugin, only: %i[update destroy show]

  def index
    json_response PluginSerializer.new(TenantPlugin.where(tenant: current_tenant).select(:tenant),
                                       { params: { tenant: current_tenant } }).serializable_hash.to_json
  end

  def create
    operation = ActivatePlugin.call({
                                      tenant: @current_tenant,
                                      profile: @current_profile,
                                      plugin_id: permit_params[:plugin_id]
                                    })
    response = operation.response
    if response.status != :ok
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
             status: response.status
    else
      json_response(
        PluginSerializer.new(response.result,
                             { params: { tenant: current_tenant } }).serializable_hash.to_json, :ok, response.result, :bad_request
      )
    end
  end

  def update
    operation = UpdateTenantPlugin.call({
                                          tenant: @current_tenant,
                                          profile: @current_profile,
                                          plugin_id: @plugin.id,
                                          active: permit_params[:active],
                                          tenant_settings: permit_params[:tenant_settings].to_h || {}
                                        })
    response = operation.response

    if response.status != :ok
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
             status: response.status
    else
      json_response(
        TenantPluginSerializer.new(response.result,
                                   { params: { tenant: current_tenant } }).serializable_hash.to_json, :ok, response.result, :bad_request
      )
    end
  end

  private

  def permit_params
    params.permit(:id, :plugin_id, :active, tenant_settings: {})
  end

  def set_plugin
    @plugin = Plugin.find(permit_params[:id])
  end
end
