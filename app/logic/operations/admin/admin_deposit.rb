class AdminDeposit <  BaseOperation

  prepend SimpleCommand
  def initialize(args)
    super
    @args = args
  end

  def do_call
    @action = @action_factory.admin_deposit @args
    notifier = NewBonusNotifier.new @args
    notifier.add_transport(UnifiedTransport.new)
    notifier.add_transport(WallTransport.new)
    @action.attach_notifier notifier
    @action.attach_validator(IsActiveValidator.new(@args))
    @action.attach_validator(AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
