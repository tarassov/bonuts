class BaseOperation
  prepend SimpleCommand
  include CheckingArgs
  attr_reader :action_factory, :profile, :args, :response

  def initialize(args = {})
    @args = args
    check_errors = check_args(args)
    if check_errors.any?
      check_errors.each do |error|
        errors.add(:error, error)
      end
    end
    @profile = args.fetch(:profile, nil)
    @tenant = args.fetch(:tenant, @profile.tenant) if @profile
    @tenant = args.fetch(:tenant, nil) unless @profile
    @args = args.merge({ tenant:  @tenant })
    # @profile = args.merge({ tenant:  @tenant })//todo: remove later
    @serializer_model_name = args.fetch(:serializer_model_name, nil)
    @action_factory = ActionFactory.new
  end

  def call
    start_time = Time.zone.now

    before_call

    if errors.any?
      @response = OperationResponse.new({
        errors:,
        result: nil,
        time: Time.zone.now - start_time,
        serializer_model_name: @serializer_model_name,
      })
      return @response
    end

    action = do_call
    if action
      action.errors.each do |key, message|
        errors.add(key, message)
      end
    else
      errors.add(:error, I18n.t("no_result"))
    end

    end_time = Time.zone.now
    @response = OperationResponse.new({
      profile: @profile,
      errors:,
      result: operation_result,
      time: end_time - start_time,
      success_status:,
      serializer_model_name: @serializer_model_name,
    })
  end

  def success_status
    :ok
  end

  protected

  def do_call
    raise NotImplementedError
  end

  def before_call; end

  def operation_result
    raise NotImplementedError
  end

  def args_to_check
    [:profile]
  end
end
