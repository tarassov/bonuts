class AuthenticateUser
  prepend SimpleCommand
  def initialize(email, password)
    @email = email
    @password = password

  end

  def call
    JsonWebToken.encode(user_id: user.id)  if user
  end
  private

  attr_accessor :email, :password
  def user
    user = User.find_by_email(email)

    if user && user.authenticate(password)
      return  user if user.email_confirmed
      errors.add :user_authentication, 'Confirm your email first'
   #   return nil
    end

    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end
