class AttachToTenantAction < BaseAction
   
    def user
      return @user
    end

    def result_event
        @event
    end
    
    protected
    def do_call 
        #TODO: проверять наличие приглашения или домен тенанта и почты
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
        @user.email_confirmed = true if @args[:invited]
        user.set_recover_token if @args[:invited]
        @user.save
        @user.profiles << profile

        deal = Deal.create({profile: profile, comment: 'welcome', deal_type: 'new user'})
        if profile.tenant.welcome_points && profile.tenant.welcome_points>0
            AccountOperation.create({ amount:profile.tenant.welcome_points, account_id: profile.self_account.id, direction: 1,deal: deal})
        end
        if profile.tenant.welcome_donuts && profile.tenant.welcome_donuts > 0
            AccountOperation.create({ amount: profile.tenant.welcome_donuts, account_id: profile.distrib_account.id, direction: 1,deal: deal})
        end
        
        if @args[:invited]
            log = PublicEventAction.call({ profile: @args[:profile], content: "#{@args[:profile].user.name} пригласил #{@user.name} в проект" })
        else
           # log = PublicEventAction.call({ profile: profile, content: @user.name + ' присоединился(лась) к проекту' })    
        end
        
        @event = log.result if log
      
        return @user 
    end
end
  
   