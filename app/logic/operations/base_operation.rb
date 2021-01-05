class BaseOperation
  prepend SimpleCommand
  attr_reader :action_factory, :profile, :args, :response

  def initialize(args = {})
    @args = args
    check_args args

    @action_factory = ActionFactory.new
  end

  def check_args args
    @profile = args.fetch(:profile, nil) 

    unless @profile
      errors.add :error, "Profile argument should be passed to create " + self.class.name
    end 
    @args = args.merge({tenant: @profile.tenant})
    @tenant  =  @profile.tenant
  end

  def call
    start_time = Time.now

    if errors.any?
      @response = OperationResponse.new({ errors: errors, result:  nil, time: start_time - start_time })
      return @response
    end

    action = do_call
    if action
      action.errors.each do |key, message|
        errors.add key, message
      end
    else
      errors.add :error, I18n.t('no_result')
    end
   
    end_time = Time.now
    @response = OperationResponse.new({ errors: errors, result: operation_result, time: end_time - start_time })
  end

  protected

  def do_call
    raise NotImplementedError
  end

  def operation_result
    raise NotImplementedError
  end
end
