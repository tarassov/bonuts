class UpdateDonutsSchedulerAction < BaseAction
  attr_reader :donuts_scheduler

  def result_event
    @donuts_scheduler
  end

  def args_to_check
    %i[id donuts_scheduler]
  end

  protected

  def do_call
    # check existence
    @donuts_scheduler = get_argument(:donuts_scheduler)

    # check if circle exists
    unless @donuts_scheduler
      errors.add :error, I18n.t('donuts_scheduler.donuts_scheduler_not_found')
      return nil
    end

    # create new circle
    new_values = @args.except(:action_tenant, :profile, :current_user, :id, :donuts_scheduler)
    @donuts_scheduler.update(new_values)
    @donuts_scheduler
  end
end
