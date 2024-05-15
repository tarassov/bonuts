class UpdateProfileNotification < BaseOperation
  def do_call
    @action = @action_factory.update_profile_notification(@args)
    @action.attach_validator(CanCanValidator.new({ action: :manage, subject: @args[:asset] }))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
