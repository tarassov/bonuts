class ShareAll < BaseOperation
  prepend SimpleCommand
  def initialize(args)
    super
    @args = args
  end

  def do_call
    @action = @action_factory.share_all @args
    notifier = NewDonutsNotifier.new @args
    notifier.add_transport(LoggerTransport.new)
    notifier.add_transport(UnifiedTransport.new)
    #notifier.add_transport(MattermostTransport.new)
    @action.attach_notifier notifier
    @action.attach_validator(AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
