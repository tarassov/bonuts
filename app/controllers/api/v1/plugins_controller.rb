class Api::V1::PluginsController < Api::V1::ApiController
  include AbilityObsolete

  before_action :set_plugin, only: [:activate]

  def index
    return unless check_admin

    tenant = current_tenant
    render json: Api::V1::Plugins::IndexSerializer.new(Plugin.all, scope: { tenant: }).as_json
  end

  def activate
    command = Api::V1::Plugins::Activate.new(current_profile, current_tenant, @plugin).call
    if command.success?
      head :ok
    else
      render_errors(command.errors)
    end

  end

  private

  def set_plugin
    @plugin = Plugin.find_by({ id: params[:id] })
  end
end
