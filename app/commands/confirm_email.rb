class ConfirmEmail
  prepend SimpleCommand
  def initialize(token)
    @token = token
  end

  def call
    if (user)
      user.validate_email
      user.save(validate: false)
      JsonWebToken.encode(user_id: user.id)
    end
  end
  private

  attr_accessor :token,
  def user
    user = User.find_by_confirm_token(params[:token])
    return user if user

    errors.add :invalid_confirmation_token, 'invalid_confirmation_token'
    nil
  end
end
