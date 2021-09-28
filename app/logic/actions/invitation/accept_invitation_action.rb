class AcceptInvitationAction < BaseAction
    attr_reader :user
    
    def result_event
      profile
    end
  
    protected
  
    def do_call
      @invitation = Invitation.find(@args[:invitation_id])
      @user =   @args[:profile].user
      profile = Profile.new({ tenant_id: tenant.id, default: true, active: true })
      profile.save
      @user.profiles << profile
      
      @invitation.activated = true
      @invitation.save
    
      if profile.tenant.welcome_points && profile.tenant.welcome_points > 0
        AccountOperation.create({ amount: profile.tenant.welcome_points, account_id: profile.self_account.id,
                                  direction: 1, deal: deal })
      end
      if profile.tenant.welcome_donuts && profile.tenant.welcome_donuts > 0
        AccountOperation.create({ amount: profile.tenant.welcome_donuts, account_id: profile.distrib_account.id,
                                  direction: 1, deal: deal })
      end
  
      if @args[:invited]
        log = PublicEventAction.call({ profile: @args[:profile],
                                       content: "#{@args[:profile].user.name} пригласил #{@user.name} в проект" })
      else
        # log = PublicEventAction.call({ profile: profile, content: @user.name + ' присоединился(лась) к проекту' })
      end
  
      @event = log.result if log
  
      @user
    end
  end
  