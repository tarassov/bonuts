class CloseRequest <  BaseOperation

   def do_call
      @action = @action_factory.close_request  @args
      #@action.attach_validator(AdminValidator.new(@args))
      @action.attach_validator(CanCanValidator.new({action: :create, subject: Request}))
      #@action.attach_validator(StoreAdminValidator.new(@args))
      notifier = RequestClosedNotifier.new @args
      notifier.add_transport(UnifiedTransport.new)
      @action.attach_notifier notifier
      @action.attach_validator(CanCanValidator.new({action: :create, subject: Request}))
      @action.call
    end
  
    def operation_result
      @action.action_result
    end

    def args_to_check
      %i[profile asset]
    end
end
