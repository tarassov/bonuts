# frozen_string_literal: true

class AccountOperation < ApplicationRecord
  belongs_to :parent_operation, class_name: 'AccountOperation', optional: true
  belongs_to :account
  belongs_to :deal

  def date_string(profile)
    # zone = ActiveSupport::TimeZone.new("Moscow")
    created_at.in_time_zone(profile.user.zone).strftime('%d/%m/%Y %H:%M') if profile && created_at
  end

  def from_profile
    if deal && %w[transfer share].include?(deal.deal_type)
      if direction == -1
        account.profile
      elsif deal.account_operations.where(direction: -1).any?
        deal.account_operations.where(direction: -1).first.account.profile
      end
    end
  end

  def to_profile
    if deal && %w[transfer share].include?(deal.deal_type)
      if direction == 1
        account.profile
      elsif deal.account_operations.where(direction: 1).any?
        deal.account_operations.where(direction: 1).first.account.profile
      end
    end
  end
end
