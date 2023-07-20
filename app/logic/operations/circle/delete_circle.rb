class DeleteCircle < BaseOperation
  def do_call
    @action = @action_factory.delete_circle @args
    @action.attach_validator(CanCanValidator.new({ action: :delete, subject: Circle }))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
