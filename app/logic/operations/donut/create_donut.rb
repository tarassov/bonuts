class CreateDonut <  BaseOperation

   def do_call
      @action = @action_factory.create_donut  @args
      #@action.attach_validator(AdminValidator.new(@args))
      @action.call
    end
  
    def operation_result
      @action.action_result
    end

    def args_to_check
      %i[tenant profile price name]
  end
end
