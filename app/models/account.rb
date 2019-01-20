class Account < ApplicationRecord
  belongs_to :user
  has_many :account_operations


  def balance
    AccountOperation.where(account_id:  self.id).sum("direction*amount")
  end

  def send_points account_id, amount
      if self.balance > amount
        reciver = Account.find(account_id)
        ActiveRecord::Base.transaction do
          self.withdrawal(amount)
          reciver.deposit(amount)
        end
      else
        raise "not enough points"
      end
  end

  def deposit amount
    AccountOperation.create({amount: amount, account_id: self.id, direction: 1})
  end

  def withdrawal amount
    AccountOperation.create({amount: amount, account_id: self.id, direction: -1})
  end

  def is_available_to_send  amount
    self.balance.amount
  end
end
