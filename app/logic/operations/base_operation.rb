class BaseOperation
  prepend SimpleCommand
  attr_reader :action_factory, :profile, :args,:response

  def initialize(args = {})
    @profile = args[:profile]
    @args = args
    @action_factory = ActionFactory.new
  end


  def call
    start_time = Time.now
    response = OperationResponse.new
    action  = do_call
    if action
      action.errors.each do |key,message|
        errors.add key,message
      end
    else
      errors.add :error, I18n.t('no_result')
    end
    if errors.any? 
    end
    end_time = Time.now
    @response  =   OperationResponse.new({errors: errors, result: operation_result, time: end_time - start_time })
  end

  protected

  def do_call
    raise NotImplementedError
  end

  def operation_result
    raise NotImplementedError
  end

end
