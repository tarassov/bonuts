class CreateCircle < BaseOperation
  def do_call
    @action = @action_factory.create_circle @args
    @action.attach_validator(CanCanValidator.new({ action: :create, subject: Circle }))
    @action.call
  end

  def success_status
    :created
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[name]
  end
end
