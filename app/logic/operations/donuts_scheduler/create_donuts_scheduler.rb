class CreateDonutsScheduler < BaseOperation
  def do_call
    @action = @action_factory.create_donuts_scheduler @args
    @action.attach_validator(CanCanValidator.new({ action: :create, subject: DonutsScheduler }))
    @action.call
  end

  def success_status
    :created
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[name every amount comment profile]
  end
end
