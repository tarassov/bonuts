class UpdateCircle < BaseOperation
  def do_call
    @action = @action_factory.update_circle @args
    @action.attach_validator(CanCanValidator.new({ action: :create, subject: Circle }))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[name id]
  end
end
