class DeleteCircle < BaseOperation
  def do_call
    @action = @action_factory.delete_circle @args
    @action.attach_validator(Validators::CanCanValidator.new({ action: :delete, subject: @args[:circle] }))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[circle id]
  end
end
