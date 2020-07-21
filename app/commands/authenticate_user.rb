# frozen_string_literal: true

class AuthenticateUser
  prepend SimpleCommand
  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    if user
      { tenant: user.profiles.first.tenant.name, auth_token: JsonWebToken.encode(user_id: user.id) }
    end
  end

  private

  attr_accessor :email, :password
  def user
    user = User.find_by_email(email)

    if user&.authenticate(password)
      return user if user.email_confirmed

      errors.add :user_authentication, { errorMessage: 'Confirm your email first', errorCode: 5000, errorParams: { email: email } }
      # errors.add :user_authentication, 'Confirm your email first'
      #   return nil
    end

    errors.add :user_authentication, { errorMessage: 'invalid credentials', errorCode: 0 }
    nil
  end
end
