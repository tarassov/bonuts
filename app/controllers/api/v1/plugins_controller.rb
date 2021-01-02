class Api::V1::PluginsController < Api::V1::ApiController
    include Ability
    before_action :set_plugin, only: %i[update destroy show]
  
    def index
        json_response PluginSerializer.new(Plugin.all, { params: {tenant: current_tenant} }).serialized_json
    end
  
    private
  
  
    def permit_params
      params.permit(:id, :name)
    end
  end
  