class DeleteDonutsScheduler < BaseOperation
  def do_call
    @action = @action_factory.delete_donuts_scheduler @args
    @action.attach_validator(Validators::CanCanValidator.new({ action: :delete, subject: @args[:donuts_scheduler] }))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[id donuts_scheduler profile]
  end
end
