class ConfirmEmailAction < BaseAction
   
    protected
    def do_call 
        user = get_user 
        if user
          user.validate_email
          user.save
          return {user: user, auth_token: JsonWebToken.encode(user_id: user.id)}
        end
    end

    private

    def get_user 
        user = User.find_by_confirm_token(@args[:token])
        return user  if user
 
        errors.add :error, I18n.t('invalid_confirmation_token')
        nil

        rescue ActiveRecord::RecordNotFound
           errors.add :error, 'Token not found'
           nil
    end
end
  
   