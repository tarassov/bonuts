class UpdateCircleAction < BaseAction
  attr_reader :circle

  def result_event
    @circle
  end

  def args_to_check
    %i[id]
  end

  protected

  def do_call
    # check existence
    @circle = Circle.where(id: @args[:id], tenant: action_tenant).first

    # check if circle exists
    unless @circle
      errors.add :error, I18n.t('circle.circle_not_found')
      return nil
    end

    # create new circle
    new_values = @args.except(:action_tenant, :profile, :current_user, :id)
    @circle.update(new_values)
    @circle
  end
end
