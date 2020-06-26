# frozen_string_literal: true

class AccountOperation < ApplicationRecord
  belongs_to :parent_operation, class_name: 'AccountOperation', optional: true
  belongs_to :account
  belongs_to :deal

  def self.create_withdrawl(args)
    operation = AccountOperation.create(args.merge({ direction: -1 }))
  end

  def self.create_deposit(args)
    operation = AccountOperation.create(args.merge({ direction: 1 }))
  end

  def date_string(profile)
    # zone = ActiveSupport::TimeZone.new("Moscow")
    if profile && created_at
      created_at.in_time_zone(profile.user.zone).strftime('%d/%m/%Y %H:%M')
    end
  end
end
