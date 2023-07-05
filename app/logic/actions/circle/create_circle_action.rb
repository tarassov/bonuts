class CreateCircleAction < BaseAction
  attr_reader :circle

  def result_event
    @invitation
  end

  def args_to_check
    %i[name]
  end

  protected

  def do_call
    # check existence
    @circle = Circle.where(name: @args[:name], tenant: action_tenant).first

    # check if circle exists
    if @circle
      errors.add :error, I18n.t('circle.circle_exists', circle_name: @circle.name)
      return nil
    end

    # create new circle
    @circle = Circle.create!({ name: @args[:name], tenant: action_tenant, active: true })
    @circle.save

    @circle
  end
end
