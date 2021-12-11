class CloseRegard <  BaseOperation

   def do_call
      @action = @action_factory.close_regard  @args
      #@action.attach_validator(AdminValidator.new(@args))
      @action.attach_validator(CanCanValidator.new({action: :create, subject: ProfileAsset}))
      #@action.attach_validator(StoreAdminValidator.new(@args))
      @action.call
    end
  
    def operation_result
      @action.action_result
    end

    def args_to_check
      %i[profile asset]
    end
end
