class DeleteCircle <  BaseOperation

   def do_call
      @action = @action_factory.delete_circle  @args
      #@action.attach_validator(AdminValidator.new(@args))
      @action.call
    end
  
    def operation_result
      @action.action_result
    end
end
