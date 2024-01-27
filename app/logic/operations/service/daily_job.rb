class DailyJob
  def self.call
    daily_schedulers = DonutsScheduler.where(active: true, every: 'daily')
    weekly_schedulers = DonutsScheduler.where(active: true, every: 'weekly')
    proceed(daily_schedulers, false)
    proceed(weekly_schedulers, true)
  end

  def self.proceed(daily_schedulers, weekly)
    daily_schedulers.each do |scheduler|
      ActiveRecord::Base.transaction do
        timezone = Time.find_zone!(scheduler.timezone)
        Time.use_zone(timezone) do
          current_date = DateTime.current
          scheduler_time = scheduler.time_in_seconds || 0
          current_week_day = DateTime.current.wday
          current_week_day = 7 if current_week_day == 0
          puts current_week_day if weekly
          this_day = (scheduler.day == current_date.day && !weekly) || (scheduler.weekday == current_week_day && weekly)
          if this_day && current_date.seconds_since_midnight >= scheduler_time
            log_entry = SchedulerLog.where(tenant: scheduler.tenant, donuts_scheduler: scheduler,
                                           scheduler_success: true).where(created_at: (Time.zone.now - 2.days)..)
            if log_entry.count.zero? && !scheduler.tenant.nil? && scheduler.amount > 0
              operation = ShareAll.call({
                                          tenant: scheduler.tenant,
                                          profile: scheduler.profile,
                                          amount: scheduler.amount,
                                          comment: scheduler.comment,
                                          burn_old: scheduler.burn_old
                                        })

              SchedulerLog.create({ tenant: scheduler.tenant, donuts_scheduler: scheduler, error_message: '',
                                    scheduler_success: operation.success? })
            end
          end
        end
      end
    end
  end
end
