class ConfirmEmail < BaseOperation
  def do_call
    @action = @action_factory.confirm_email @args
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[token]
  end
end
