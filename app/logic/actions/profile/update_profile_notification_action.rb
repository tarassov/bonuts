class UpdateProfileNotificationAction < BaseAction
  protected

  def args_to_check
    [:id, :active]
  end

  def do_call
    @circle = get_argument(:circle)

    # check if circle exists
    unless @circle
      errors.add(:error, I18n.t("circle.circle_not_found"))
      return
    end

    # create new circle
    new_values = @args.except(:action_tenant, :profile, :current_user, :id, :circle)
    @circle.update(new_values)
    @circle
  end
end
