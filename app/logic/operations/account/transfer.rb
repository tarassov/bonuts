class Transfer < BaseOperation
  prepend SimpleCommand

  def initialize(args)
    super
    @args = args
  end

  def do_call
    @action = @action_factory.transfer(@args)
    notifier = Notifiers::NewBonusNotifier.new(@args)
    notifier.add_transport(Notifiers::Transport::UnifiedTransport.new({ use_api_email: true }))
    notifier.add_transport(Notifiers::Transport::WallTransport.new)
    @action.attach_notifier(notifier)
    @action.attach_validator(Validators::IsActiveValidator.new(@args))
    @action.attach_validator(Validators::Account::TransferValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def success_status
    :created
  end
end
