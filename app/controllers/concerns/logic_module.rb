module LogicModule
    def logic_call operation, options
        if options.is_a? ActionController::Parameters 
            options=options.to_h
        end
        operation_object = operation.call options.merge(profile: current_profile, tenant: current_tenant, current_user: current_user)
        response = operation_object.response
        render response.json, status: response.status
    end
end
