class Register <  BaseOperation

  def check_args args
    @profile = nil

    @tenant = args.fetch(:tenant, nil)
    raise "Tenant argument should be passed to create register operation " + self.class.name  unless @tenant 

  end

  def do_call
      @action = @action_factory.register  @args
      notifier = NewUserNotifier.new @args
      notifier.add_transport(LoggerTransport.new)
      notifier.add_transport(UnifiedTransport.new)
      @action.attach_notifier notifier
      #@action.attach_validator(AdminValidator.new(@args))
      @action.call
    end
  
    def operation_result
      @action.action_result
  end
end
