class Transfer < BaseOperation
  prepend SimpleCommand
  def initialize(args)
    super
    @args = args
  end

  def do_call
    @action = @action_factory.transfer @args
    notifier = NewBonusNotifier.new @args
    head_notifier = NewBonusHeadNotifier.new @args
    notifier.add_transport(UnifiedTransport.new)
    notifier.add_transport(WallTransport.new)
    head_notifier.add_transport(UnifiedTransport.new)
    @action.attach_notifier notifier
    @action.attach_notifier head_notifier
    @action.attach_validator(IsActiveValidator.new(@args))
    @action.attach_validator(TransferValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
  end
