class ActivatePlugin < BaseOperation
  prepend SimpleCommand

  def do_call
    @action = @action_factory.activate_plugin @args
    @action.attach_validator(Validators::AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
