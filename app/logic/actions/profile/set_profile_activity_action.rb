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

    @profile_to_operate.active = get_argument(:active)
    @profile_to_operate
  end
end
