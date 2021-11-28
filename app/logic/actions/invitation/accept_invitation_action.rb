class AcceptInvitationAction < BaseAction
    attr_reader :user, :profile, :tenant
    
    def result_event
      profile
    end

    def action_executor
      @profile
    end

    def args_to_check
      %i[invitation profile]
    end
  
    protected
  
    def do_call
      @invitation = @args[:invitation]
     
      @profile =   @args[:profile]
      @tenant =  @invitation.tenant  
      @user = @profile.user   
        
      @invitation.activated = true
      @invitation.closed = true
      @invitation.deals << action_deal('accept invitation')
      @invitation.save

      JoinToTenantAction.call({tenant: @tenant, profile: @profile}).result
    end
  end
  