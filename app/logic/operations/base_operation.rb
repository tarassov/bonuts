class BaseOperation
  prepend SimpleCommand
  attr_reader :action_factory, :profile, :args, :response

  def initialize(args = {})
    @args = args
    check_args args
    @action_factory = ActionFactory.new
  end

  def check_args(args)
    args_to_check.each do |argument|
      arg = args.fetch(argument, nil)
      unless arg
        errors.add :error, "#{argument} argument should be passed to create " + self.class.name        
      end
    end

    @profile = args.fetch(:profile, nil)
    @tenant = args.fetch(:tenant, nil)
    @args = args.merge({ tenant:  @tenant })
    @profile = args.merge({ tenant:  @tenant })
  end

  def call
    start_time = Time.now
    
    before_call
    
    if errors.any?
      @response = OperationResponse.new({ errors: errors, result: nil, time: start_time - start_time })
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
    @response = OperationResponse.new({ errors: errors, result: operation_result, time: end_time - start_time, succes_status: succes_status })
    return @response
  end

  def succes_status
    :ok
  end

  protected

  def do_call
    raise NotImplementedError
  end

  def before_call
  end

  def operation_result
    raise NotImplementedError
  end

  def args_to_check
    [:profile, :tenant]
  end
end
