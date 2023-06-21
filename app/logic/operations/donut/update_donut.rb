class UpdateDonut < BaseOperation
  def do_call
    # noinspection RubyResolve
    @action = @action_factory.update_donut @args
    @action.attach_validator(CanCanValidator.new({ action: :manage, subject: Donut }))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[profile price name]
  end
end
