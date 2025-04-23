class SetProfileActivity < BaseOperation
  def do_call
    @action = @action_factory.set_profile_activity(@args)
    @action.attach_validator(Validators::CanCanValidator.new({ action: :administrate, subject: @args[:profile_to_operate] }))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[profile_to_operate active]
  end
end
