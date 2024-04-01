class RecoverPassword < BaseOperation
  def do_call
    @action = @action_factory.recover_password(@args)
    notifier = RecoverPasswordNotifier.new(@args)
    notifier.add_transport(EmailTransport.new)
    notifier.add_transport(ApiMailerTransport.new)
    @action.attach_notifier(notifier)
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    [:email]
  end
end
# frozen_string_literal: true
