class ActivateRequest < BaseOperation
  prepend SimpleCommand

  def do_call
    @action = @action_factory.activate_request(@args)
    notifier = Notifiers::Request::RequestActivatedNotifier.new(@args)
    notifier.add_transport(Notifiers::Transport::UnifiedTransport.new({ use_api_email: true }))
    @action.attach_notifier(notifier)
    @action.attach_validator(Validators::CanCanValidator.new({ action: :manage, subject: Request }))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
