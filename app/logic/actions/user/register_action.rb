class RegisterAction < BaseAction
   
    def user
      return @user
    end

    def result_event
        @event
    end
    
    protected
    def do_call        
        @demo = @args.fetch(:demo, false)
     
        user_count = User.where(email: @args[:email], demo:  @demo).count
        
        if user_count>0
            errors.add :error, I18n.t('email_taken')   
            return nil
        end
        @user = User.create!({email: @args[:email], password: @args[:password], first_name: @args[:first_name], last_name:  @args[:last_name]})
    
        @user.demo = @demo
        @user.active  = @demo
        @user.email_confirmed = @demo
      
        @user.save

      
        return @user 
    end
end
  
   