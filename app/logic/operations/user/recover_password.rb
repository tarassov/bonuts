class RecoverPassword < BaseOperation
  def do_call
    @action = @action_factory.recover_password(@args)
    notifier = Notifiers::RecoverPasswordNotifier.new(@args)
    # notifier.add_transport(EmailTransport.new) if Rails.env.development?
    notifier.add_transport(Notifiers::Transport::ApiMailerTransport.new) # unless Rails.env.development?
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
