# frozen_string_literal: true

class AuthenticateUser
  prepend SimpleCommand
  def initialize(email, password, tenant = nil)
    @email = email
    @password = password
    @tenant = tenant
  end

  def call
    if user
      tenants = []
      user.profiles.each do |profile|
        tenants << profile.tenant
      end
      { tenants:, currentTenant: @tenant, auth_token: JsonWebToken.encode(user_id: user.id),
        username: user.email }
    end
  end

  private

  attr_accessor :email, :password

  def user
    user = User.find_by 'lower(email) = ?', email.downcase

    if user&.authenticate(password)
      return user if user.email_confirmed

      errors.add :user_authentication,
                 { errorMessage: 'Confirm your email first', errorCode: 5000, errorParams: { email: } }
      # errors.add :user_authentication, 'Confirm your email first'
      #   return nil
    end

    errors.add :user_authentication, { errorMessage: 'invalid credentials', errorCode: 0 }
    nil
  end
end
