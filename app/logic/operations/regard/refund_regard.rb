class RefundRegard <  BaseOperation

   def do_call
      @action = @action_factory.refund_regard  @args
      @action.attach_validator(CanCanValidator.new({action: :create, subject: Request}))
      notifier = RegardRefundedNotifier.new @args
      notifier.add_transport(UnifiedTransport.new)
      @action.attach_notifier notifier
      #@action.attach_validator(AdminValidator.new(@args))
      @action.call
    end
  
    def operation_result
      @action.action_result
    end
 

    def args_to_check
      %i[profile asset]
    end
end
