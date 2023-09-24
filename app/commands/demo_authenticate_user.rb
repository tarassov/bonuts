# frozen_string_literal: true

class DemoAuthenticateUser
  prepend SimpleCommand
  def initialize(tenant)
    @tenant = tenant
  end

  def call
    tenants = []
    throw StandardError 'User not found' if user.nil?

    user.profiles.each do |profile|
      tenants << profile.tenant
    end
    { tenants:, currentTenant: @tenant, auth_token: JsonWebToken.encode(user_id: user.id), username: user.email }
  end

  private

  attr_accessor :email, :password

  def user
    tenant = Tenant.find_by(demo: true)

    profile = tenant.profiles.where(admin: true).first

    user = profile.user

    if user
      return user if user.email_confirmed

      errors.add :user_authentication, 'Confirm your email first'
      #   return nil
    end

    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end
