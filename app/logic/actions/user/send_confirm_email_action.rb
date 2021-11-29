class SendConfirmEmailAction < BaseAction
    attr_reader :user

    protected
    def do_call 
        @user = User.find_by "lower(email) = ?", @args[:email].downcase    
        if @user && !(@user.demo && !Rails.env.development?)
          @user.reset_confirmation_token
          @user.save        
        end

        @user
    end
end
  
   