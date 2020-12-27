class ConfirmEmail <  BaseOperation
  def check_args args
    @profile = nil
    @tenant = nil

    raise "Token argument should be passed to create register operation " + self.class.name  unless args.fetch(:token, nil)

  end

  def do_call
      @action = @action_factory.confirm_email  @args
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
