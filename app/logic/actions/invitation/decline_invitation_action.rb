class DeclineInvitationAction < BaseAction
    attr_reader :user, :profile, :tenant
    
    def result_event
      @invitation
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
        
      @invitation.activated = false
      @invitation.declined = true
      @invitation.closed = true
      @invitation.deals << action_deal('decline_invitation')
      @invitation.save
      @invitation
    end
end
  
   