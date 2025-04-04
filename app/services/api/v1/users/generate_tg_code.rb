# frozen_string_literal: true
class Api::V1::Users::GenerateTgCode < BaseService
  def initialize(profile, tenant)
    @profile = profile
    @tenant = tenant
  end

  def call
    command = Actions::Users::GenerateTgCode.new({ profile: @profile, tenant: @tenant })
    command.call
  end
end
