class DailyJob
    def self.call
        t = Time.now
        schedulers   = DonutsSchedulers.where(day: t.day, active: true, every: 'day')
        schedulers.each do |sheduler|
            operation = ShareAll.call({
                tenant: sheduler.tenant,
                profile: sheduler.profile,
                amount: sheduler.amount,
                comment: sheduler.comment,
                burn_old: sheduler.burn_old
              })
        end
    end    
end