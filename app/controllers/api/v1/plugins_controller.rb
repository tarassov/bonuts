class Api::V1::PluginsController < Api::V1::ApiController
  include AbilityObsolete

  def index
    if check_admin
      json_response(PluginSerializer.new(Plugin.all, { params: { tenant: current_tenant } }).serializable_hash.to_json)
    end
  end

  private

  def permit_params
    params.permit(:id, :name)
  end
end
