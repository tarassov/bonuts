class AdminDeposit < BaseOperation
  prepend SimpleCommand

  def initialize(args)
    super
    @args = args
  end

  def do_call
    @action = @action_factory.admin_deposit(@args)
    notifier = Notifiers::NewBonusNotifier.new(@args)
    notifier.add_transport(Notifiers::Transport::UnifiedTransport.new({ use_api_email: true }))
    notifier.add_transport(Notifiers::Transport::WallTransport.new) if @args[:comment] != ""
    @action.attach_notifier(notifier)
    @action.attach_validator(Validators::IsActiveValidator.new(@args))
    @action.attach_validator(Validators::AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    [:to_profile_ids, :profile, :amount, :account_type]
  end
end
