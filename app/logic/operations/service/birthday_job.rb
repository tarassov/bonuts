# frozen_string_literal: true

class BirthdayJob
  class << self
    def call
      tenants = Tenant.only_active.where("birthday_donuts > ?", 0).or(Tenant.only_active.where("birthday_points > ?", 0))

      tenants.each do |tenant|
        ActiveRecord::Base.transaction do |_tar|
          date = Time.zone.now
          log_entry = TenantDailyJobLog.where(tenant:, job_type: name, success: true).where(
            "created_at >= ? and created_at <=?", date.midnight, date.end_of_day
          )
          profiles = if (date.mon == 2) && (date.mday == 28)
            tenant.profiles.today_birthday.or(tenant.profiles.feb_29_birthday)
          else
            tenant.profiles.today_birthday
          end
          profiles_ids = profiles.map(&:id)

          if log_entry.count.zero?

            if tenant.birthday_points.positive?
              AdminDeposit.call({
                tenant:,
                profile: tenant.service_bot,
                amount: tenant.birthday_points,
                comment: tenant.birthday_message || "Happy birthday!",
                to_profile_ids: profiles_ids,
                account_type: "self",
              })
            end
            if tenant.birthday_donuts.positive?
              AdminDeposit.call({
                tenant:,
                profile: tenant.service_bot,
                amount: tenant.birthday_donuts,
                comment: tenant.birthday_message || "Happy birthday!",
                to_profile_ids: profiles_ids,
                account_type: "distrib",
              })
            end

            TenantDailyJobLog.create({
              tenant:,
              job_type: name,
              error_message: "",
              success: true,
            })
          end
        end
      end
    end
  end
end
