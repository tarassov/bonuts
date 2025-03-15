class Api::V1::PluginsController < Api::V1::ApiController
  include AbilityObsolete

  def index
    # TODO: now serializer includes tenant plugin properties - for backward compatability - remove in future
    return unless check_admin

    tenant = current_tenant
    render json: Api::V1::Plugins::IndexSerializer.new(Plugin.all, scope: { tenant: }).as_json
  end
end
