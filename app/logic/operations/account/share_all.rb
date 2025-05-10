class ShareAll < BaseOperation
  prepend SimpleCommand

  def initialize(args)
    super
    @args = args
  end

  def do_call
    @action = @action_factory.share_all(@args)
    notifier = Notifiers::NewDonutsNotifier.new(@args)
    notifier.add_transport(Notifiers::Transport::LoggerTransport.new)
    notifier.add_transport(Notifiers::Transport::UnifiedTransport.new({ use_api_email: true }))
    # notifier.add_transport(MattermostTransport.new)
    @action.attach_notifier(notifier)
    @action.attach_validator(Validators::AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
