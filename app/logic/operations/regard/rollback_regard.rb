class RollbackRegard <  BaseOperation

    def do_call
       @action = @action_factory.rollback_regard  @args
       @action.attach_validator(CanCanValidator.new({action: :create, subject: ProfileAsset}))
       @action.call
     end
   
     def operation_result
       @action.action_result
     end
 
     def args_to_check
       %i[profile asset]
     end
 end
 