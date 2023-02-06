class EditEvent < BaseOperation
  def do_call
    @action = @action_factory.edit_event @args
    @action.attach_validator(CanCanValidator.new({ action: :edit, subject: Event }))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
