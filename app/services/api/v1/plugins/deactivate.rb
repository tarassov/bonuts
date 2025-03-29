# frozen_string_literal: true
class Api::V1::Plugins::Deactivate < BaseService
  def initialize(profile, tenant, plugin)
    @profile = profile
    @tenant = tenant
    @plugin = plugin
  end

  def call
    command = Actions::Plugins::Deactivate.new({ plugin: @plugin, profile: @profile, tenant: @tenant })
    command.attach_validator(Validators::CanCanValidator.new({ action: :deactivate, subject: Plugin }))
    command.call
  end
end
