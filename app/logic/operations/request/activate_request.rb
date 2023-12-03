class ActivateRequest < BaseOperation
  prepend SimpleCommand

  def do_call
    @action = @action_factory.activate_request @args
    notifier = RequestActivatedNotifier.new @args
    notifier.add_transport(UnifiedTransport.new)
    @action.attach_notifier notifier
    @action.attach_validator(CanCanValidator.new({ action: :manage, subject: Request }))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
