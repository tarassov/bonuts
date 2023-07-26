class SetProfileActivityAction < BaseAction
  attr_reader :circle

  def result_event
    @profile_to_operate
  end

  def args_to_check
    %i[profile_to_operate active]
  end

  protected

  def do_call
    # check existence
    @profile_to_operate = get_argument(:profile_to_operate)

    # check if circle exists
    unless @profile_to_operate
      errors.add :error, I18n.t('profile.profile_not_found')
      return nil
    end

    new_value = get_argument(:active)

    if @profile_to_operate.active && new_value
      errors.add :not_changed, 'Already activated'
      return
    end

    if !@profile_to_operate.active && !new_value
      errors.add :not_changed, 'Already deactivated'
      return
    end

    @profile_to_operate.active = get_argument(:active)
    @profile_to_operate.deals << if new_value
                                   action_deal('profile_activate')
                                 else
                                   action_deal('profile_deactivate')
                                 end
    @profile_to_operate.save
    @profile_to_operate
  end
end
