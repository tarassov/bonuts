class RollbackRequest < BaseOperation
  def do_call
    @action = @action_factory.rollback_request(@args)
    @action.attach_validator(CanCanValidator.new({ action: :manage, subject: Request }))
    notifier = RequestRollbackedNotifier.new(@args)
    notifier.add_transport(UnifiedTransport.new({ use_api_email: true }))
    @action.attach_notifier(notifier)

    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    [:profile, :asset]
  end
end
