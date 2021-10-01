class AcceptInvitationAction < BaseAction
    attr_reader :user, :profile, :tenant
    
    def result_event
      profile
    end

    def action_executor
      @profile
    end
  
    protected
  
    def do_call
      @invitation = @args[:invitation]
      @user =   @args[:profile].user
      @tenant =  @invitation.tenant
      @profile = Profile.new({ tenant_id:  @tenant.id, default: true, active: true })
      @profile.save
      
      @user.profiles << @profile
      
     
      @invitation.activated = true
      @invitation.save
      deal = action_deal('accept invitation')
  
      if @profile.tenant.welcome_points && @profile.tenant.welcome_points > 0
        AccountOperation.create({ amount: @profile.tenant.welcome_points, account_id: @profile.self_account.id,
                                  direction: 1, deal: deal })
      end
      if @profile.tenant.welcome_donuts && @profile.tenant.welcome_donuts > 0
        AccountOperation.create({ amount: @profile.tenant.welcome_donuts, account_id: @profile.distrib_account.id,
                                  direction: 1, deal: deal })
      end
  
      log = PublicEventAction.call({ profile: @profile, content: I18n.t('event.new_user',name: @user.name)}) 
    
      @event = log.result if log
  
      @profile
    end
  end
  