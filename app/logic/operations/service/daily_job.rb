class DailyJob
    def self.call
        t = Time.now

        schedulers   = DonutsScheduler.where(day: t.day, active: true, every: 'daily')

        schedulers.each do |scheduler|
            ActiveRecord::Base.transaction do
                operation = ShareAll.call({
                    tenant: scheduler.tenant,
                    profile: scheduler.profile,
                    amount: scheduler.amount,
                    comment: scheduler.comment,
                    burn_old: scheduler.burn_old
                })

                SchedulerLog.create({tenant: scheduler.tenant, donuts_scheduler: scheduler, error_message: "",scheduler_success: operation.success?})
            end
        end
    end    
end