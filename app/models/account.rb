# frozen_string_literal: true

class Account < ApplicationRecord
  belongs_to :profile
  has_many :account_operations
  belongs_to :tenant

  def balance
    account_operations.sum('direction*amount')
  end

  def sent_total
    account_operations.where(direction: -1).sum(:amount)
  end

  def score_total
    account_operations.where(direction: 1).sum(:amount)
  end

  def last_operation(profile)
    last_op = account_operations.order(created_at: :desc).first
    if last_op
      direction = if last_op.direction > 0
                    '+'
                  else
                    '-'
                  end
      { direction:, amount: last_op.amount, date: last_op.date_string(profile), date_utc: last_op.created_at }
    end
  end

  def is_available_to_withdrawl(amount)
    balance >= amount
  end

  def is_available_to_deposit(_amount)
    true
  end

  def department
    @department ||= profile.department
  end

  def boss_profile
    @boss_profile ||= department.head_profile if department
  end
end
