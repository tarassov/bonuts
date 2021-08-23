class JoinToTenant <  BaseOperation

    def do_call
      @action = @action_factory.register  @args
      all_users_notifier = NewUserNotifier.new @args
      user_notifier = YouWereAddedNotifier.new @args
      all_users_notifier.add_transport(UnifiedTransport.new)
      user_notifier.add_transport(UnifiedTransport.new)
      @action.attach_notifier user_notifier
      @action.attach_notifier all_users_notifier
      @action.call
    end
  
    def operation_result
      @action.action_result
  end
  end
  