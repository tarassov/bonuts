class UpdateCircle < BaseOperation
  def do_call
    @action = @action_factory.update_circle @args
    @action.attach_validator(CanCanValidator.new({ action: :edit, subject: @args[:circle] }))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[circle id name]
  end
end
