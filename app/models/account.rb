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

  def deposit(amount, comment, parent_operation)
    AccountOperation.create_deposit(amount, id, comment, parent_operation)
  end

  def admin_deposit(amount, comment, from_profile)
    if is_available_to_deposit amount
      ActiveRecord::Base.transaction do
        deposit(amount, comment, nil)
        event = Event.log_operation ({ sender: from_profile, receiver: self, amount: amount, comment: comment, public: 0 })
      end
    end
  end

  def withdrawal(amount)
    if is_available_to_withdrawl
      AccountOperation.create_withdrawl amount, id, nil
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
