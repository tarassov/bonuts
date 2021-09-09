class DailyJob
  def self.call
    t = Time.now
    schedulers = DonutsScheduler.where(day: t.day, active: true, every: 'daily')

    schedulers.each do |scheduler|
      ActiveRecord::Base.transaction do
        date = DateTime.now
        log_entry = SchedulerLog.where(tenant: scheduler.tenant, donuts_scheduler: scheduler, scheduler_success: true).where(
          'created_at >= ? and created_at <=?', date.midnight, date.end_of_day
        )
        if log_entry.count == 0
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
