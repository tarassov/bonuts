class AcceptInvitation < BaseOperation
    def do_call
      @action = @action_factory.accept_invitation @args
      @action.attach_validator(CanCanValidator.new(:accept, @invitation))  
      user_notifier = NewUserNotifier.new @args   
      user_notifier.add_transport(UnifiedTransport.new)
      @action.attach_notifier user_notifier
      @action.call
    end

    def before_call
      @invitation = Invitation.find(@args[:id])
      @args = @args.merge({invitation: @invitation}) 
    end
  
    def operation_result
      @action.action_result
    end
  
    def args_to_check
      %i[id profile]
    end
  end
  