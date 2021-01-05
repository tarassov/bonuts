class Register <  BaseOperation

  def check_args args
    @profile = nil

    @tenant = args.fetch(:tenant, nil)
    unless @tenant
      errors.add :error, "Tenant argument should be passed to create register operation " + self.class.name
    end 

  end

  def do_call
      @action = @action_factory.register  @args
      notifier = ConfirmEmailNotifier.new @args
      # notifier.add_transport(LoggerTransport.new)
      notifier.add_transport(EmailTransport.new)
      @action.attach_notifier notifier
      #@action.attach_validator(AdminValidator.new(@args))
      @action.call
    end
  
    def operation_result
      @action.action_result
  end
end
