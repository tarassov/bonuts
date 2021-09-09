class InviteUser < BaseOperation
  def do_call
    @action = @action_factory.invite_user @args
    # @action.attach_validator(AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end

  def args_to_check
    %i[email last_name first_name profile]
  end
end
