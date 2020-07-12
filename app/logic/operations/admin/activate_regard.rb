class ActivateRegard < BaseOperation
    prepend SimpleCommand
    
    def do_call
      @action = @action_factory.activate_regard @args
      notifier = RegardActivatedNotifier.new @args
      notifier.add_transport(EmailTransport.new)
      @action.attach_notifier notifier
      @action.attach_validator(StoreAdminValidator.new(@args))
      @action.call
    end
  
    def operation_result
      @action.action_result
    end
  end
  