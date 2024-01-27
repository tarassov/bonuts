class UpdateDonutsScheduler < BaseOperation
  def do_call
    @action = @action_factory.update_donuts_scheduler @args
    @action.attach_validator(CanCanValidator.new({ action: :edit, subject: @args[:donuts_scheduler] }))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[profile donuts_scheduler id]
  end
end
