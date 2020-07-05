class Purchase < BaseOperation
  prepend SimpleCommand
  
  

  def do_call
    @action = @action_factory.purchase @args
    @action.attach_validator(IsActiveValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
