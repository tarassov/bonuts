class JoinToTenant < BaseOperation
  def args_to_check
    %i[user tenant]
  end

  def do_call
    @action = @action_factory.join_to_tenant @args
    all_users_notifier = NewUserNotifier.new @args
    all_users_notifier.add_transport(UnifiedTransport.new)
    @action.attach_notifier all_users_notifier
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
