class Api::V1::PluginsController < Api::V1::ApiController
  include AbilityObsolete

  def index
    # TODO: now serializer includes tenant plugin properties - for backward compatability - remove in future
    if check_admin
      json_response(PluginSerializer.new(Plugin.all, { params: { tenant: current_tenant } }).serializable_hash.to_json)
    end
  end
end
