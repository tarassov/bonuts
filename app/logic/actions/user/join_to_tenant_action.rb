class JoinToTenantAction < BaseAction
   
    def user
      return @user
    end

    def result_event
        @event
    end
    
    
    protected
    def do_call 
        #TODO: проверять наличие приглашения или домен тенанта и почты
        @user = @args[:user]
        tenant = @args[:tenant]

        #check join conditions(invitations, domains, tenant rules....)

        invitations = Invitation.where(user: @user, tenant: tenant, activated: false)



        deal = Deal.create({profile: profile, comment: 'welcome', deal_type: 'join_to_tenant'})

        
        profile = Profile.new({ tenant_id: tenant.id, default: true, active: true })
        profile.save
        @user.profiles << profile


        if invitations.any?
            invitations.each do |invitation|
                invitation.activated = true
            end
        end


  

        
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
  
   