class ConfirmEmailAction < BaseAction
    def result_event
        @event
    end

    def  tenant
        @tenant
    end

    def user
        @user
    end

    protected
    def do_call 
        @user = get_user 
        if user
          @user.validate_email
          @user.save
          return {user: user, auth_token: JsonWebToken.encode(user_id: user.id)}
        end
    end

    private

    def get_user 
        user = User.find_by_confirm_token(@args[:token])
        return user  if user
 
        errors.add :error, I18n.t('invalid_confirmation_token')
        return nil

        rescue ActiveRecord::RecordNotFound
           errors.add :error, 'Token not found'
           return nil
    end
end
  
   