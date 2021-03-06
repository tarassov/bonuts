class Purchase < BaseOperation
  prepend SimpleCommand

  def do_call
    @action = @action_factory.purchase @args
    notifier  = PurchaseNotifier.new @args
    notifier.add_transport(UnifiedTransport.new)
    @action.attach_validator(IsActiveValidator.new(@args))
    @action.attach_notifier notifier
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
