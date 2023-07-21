class DeleteCircleAction < BaseAction
  def args_to_check
    %i[id circle]
  end

  protected

  def do_call
    # check existence
    @circle = get_argument(:circle)

    # check if circle exists
    unless @circle
      errors.add :error, I18n.t('circle.circle_not_found')
      return nil
    end

    @circle.active = false
    @circle.save!
    @circle
  end
end
