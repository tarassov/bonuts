# # frozen_string_literal: true

# class ConfirmEmailObsolete
#   prepend SimpleCommand
#   def initialize(token)
#     @token = token
#   end

#   def call
#     new_user = user
#     if new_user
#       new_user.validate_email
#       new_user.save
#       JsonWebToken.encode(user_id: new_user.id)
#     end
#   end

#   private

#   attr_accessor :token
#   def user
#     user = User.find_by_confirm_token(token)
#     if user
#       user.active = true
#       return user
#     end

#     errors.add :invalid_confirmation_token, 'invalid_confirmation_token'
#     nil
#   end
# end
