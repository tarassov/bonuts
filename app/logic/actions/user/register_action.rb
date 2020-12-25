class RegisterAction < BaseAction
   
    def user
      return @user
    end

    def result_event
        @event
    end
    
    protected
    def do_call 
        user_count = User.where(email: @args[:email]).count
        if user_count>0
            errors.add :error, I18n.t('email_taken')   
            return nil
        end
        @user = User.create!({email: @args[:email], password: @args[:email], first_name: @args[:first_name], last_name:  @args[:last_name]})
        tenant = @args[:tenant]
        profile = Profile.new({ tenant_id: tenant.id, default: true, active: true })
        profile.save
        @user.demo = tenant.demo
        @user.email_confirmed = tenant.demo
        @user.save
        @user.profiles << profile
        log = PublicEventAction.call({ profile: profile, content: @user.name + ' присоединился(лась) к проекту' })
        @event = log.result
      
        return @user 
    end
end
  
   