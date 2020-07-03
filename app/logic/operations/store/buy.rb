class Buy < BaseOperation
  prepend SimpleCommand
  
  

  def do_call
    @action = @action_factory.buy @args
    @action.attach_validator(IsActiveValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
