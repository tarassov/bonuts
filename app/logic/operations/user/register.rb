class Register < BaseOperation
  def do_call
    @action = @action_factory.register(@args)
    notifier = ConfirmEmailNotifier.new(@args)
    # notifier.add_transport(LoggerTransport.new)
    notifier.add_transport(EmailTransport.new) if Rails.env.development?
    notifier.add_transport(ApiMailerTransport.new) unless Rails.env.development?
    @action.attach_notifier(notifier)
    # @action.attach_validator(AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    [:email, :last_name, :first_name, :password]
  end
end
