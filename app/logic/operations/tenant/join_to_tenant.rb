class JoinToTenant <  BaseOperation

   def do_call
      @action = @action_factory.join_to_tenant  @args
      @action.attach_validator(JoinToTenantGuestValidator.new(@args))
      notifier  = NewUserNotifier.new(@args)
      notifier.add_transport UnifiedTransport.new
      @action.attach_notifier notifier
      @action.call
    end
  
    def operation_result
      @action.action_result
    end

    def before_call
      @tenant = Tenant.find_by_name(@args[:tenant_name])
      @args = @args.merge({tenant: @tenant})
    end

    def args_to_check
      %i[tenant_name profile]
    end
end
