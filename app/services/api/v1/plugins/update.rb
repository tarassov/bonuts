# frozen_string_literal: true
class Api::V1::Plugins::Update < BaseService
  def initialize(profile, tenant, plugin, plugin_settings)
    @profile = profile
    @tenant = tenant
    @tenant_plugin = plugin
    @plugin_settings = plugin_settings
  end

  def call
    command = Actions::Plugins::Update.new({ tenant_plugin: @tenant_plugin, profile: @profile, tenant: @tenant, plugin_settings: @plugin_settings })
    command.attach_validator(Validators::CanCanValidator.new({ action: :edit, subject: @tenant_plugin }))
    command.call
  end
end


