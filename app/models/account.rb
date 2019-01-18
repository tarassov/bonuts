class Account < ApplicationRecord
  belongs_to :user
  has_many :account_operations


  def balance
    AccountOperation.where(account_id:  self.id).sum("direction*amount")
  end

  def send_points account_id, amount
      if self.balance > amount
        minusOp = AccountOperation.create({amount: amount, account_id: account_id, direction: -1})
        plusOp=  AccountOperation.create({amount: amount, account_id: account_id, direction: -1})
        #ActiveRecord::Base.transaction do
          #david.withdrawal(100)
         # mary.deposit(100)
        #end
      else
        #TODO:send error
      end
  end

  def is_available_to_send  amount
    self.balance.amount
  end
end
