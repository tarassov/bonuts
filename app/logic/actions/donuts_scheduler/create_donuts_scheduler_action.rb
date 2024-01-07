class CreateDonutsSchedulerAction < BaseAction
  attr_reader :scheduler

  def result_event
    @scheduler
  end

  def args_to_check
    %i[name every amount comment profile]
  end

  protected

  def do_call
    if @args[:every] == 'daily' && @args[:day].nil?
      errors.add :error, I18n.t('donuts_scheduler.day_is_not_set')
      return nil
    end

    if @args[:every] == 'weekly' && @args[:weekday].nil?
      errors.add :error, I18n.t('donuts_scheduler.weekday_is_not_set')
      return nil
    end
    @scheduler = DonutsScheduler.create!(@args.except(:current_user).merge(tenant: action_tenant, profile: action_executor, active: true,
                                                                           burn_old: @args.fetch(:burn_old, false)))
    @scheduler.save

    @scheduler
  end
end
