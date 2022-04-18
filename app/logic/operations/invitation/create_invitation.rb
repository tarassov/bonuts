class CreateInvitation < BaseOperation
  def do_call
    @action = @action_factory.create_invitation @args
    @action.attach_validator(CanCanValidator.new({action: :create, subject: Invitation}))  
    user_notifier = YouWereAddedNotifier.new @args   
    user_notifier.add_transport(UnifiedTransport.new)
    @action.attach_notifier user_notifier
    @action.call
  end

  def success_status
    :created
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[email last_name first_name profile]
  end
end
