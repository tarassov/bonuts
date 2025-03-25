# frozen_string_literal: true
class Api::V1::Plugins::Activate < BaseService
  def initialize(profile, tenant, plugin)
    @profile = profile
    @tenant = tenant
    @plugin = plugin
  end

  def call
    command = Actions::Plugins::Activate.new({ plugin: @plugin, profile: @profile, tenant: @tenant })
    command.attach_validator(Validators::CanCanValidator.new({ action: :activate, subject: Plugin }))
    command.call
  end
end
