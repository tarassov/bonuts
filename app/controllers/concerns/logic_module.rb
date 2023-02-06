module LogicModule
  def logic_call(operation, options)
    options = options.to_h if options.is_a? ActionController::Parameters
    operation_object = operation.call options.merge(profile: current_profile, tenant: current_tenant,
                                                    current_user:)
    response = operation_object.response
    render json: response.json, status: response.status
  end
end
