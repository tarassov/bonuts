# frozen_string_literal: true

class ConfirmEmail
  prepend SimpleCommand
  def initialize(token)
    @token = token
  end

  def call
    new_user = user
    if new_user
      new_user.validate_email
      new_user.save
      JsonWebToken.encode(user_id: new_user.id)
    end
  end

  private

  attr_accessor :token
  def user
    puts token
    user = User.find_by_confirm_token(token)
    return user if user

    errors.add :invalid_confirmation_token, 'invalid_confirmation_token'
    nil
  end
end
