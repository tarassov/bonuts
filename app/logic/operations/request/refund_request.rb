class RefundRequest < BaseOperation
  def do_call
    @action = @action_factory.refund_request(@args)
    @action.attach_validator(Validators::CanCanValidator.new({ action: :refund, subject: @args[:asset] }))
    notifier = Notifiers::Request::RequestRefundedNotifier.new(@args)
    notifier.add_transport(Notifiers::Transport::UnifiedTransport.new({ use_api_email: true }))
    @action.attach_notifier(notifier)
    # @action.attach_validator(AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    [:profile, :asset]
  end
end
