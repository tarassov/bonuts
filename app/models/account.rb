class Account < ApplicationRecord
  belongs_to :user
  has_many :account_operations



  def balance
    AccountOperation.where(account_id:  self.id).sum("direction*amount")
  end

  def send_points (account_id, amount,comment)
      if account_id == self.id
        raise Error::ForbiddenError.new('Impossible transfer to the same account')
      end

      if self.balance >= amount
        receiver = Account.find(account_id)
        sender  = Account.find (self.id)
        ActiveRecord::Base.transaction do
          withdrawOp = self.withdrawal(amount)
          depositOp = receiver.deposit(amount,comment, withdrawOp)

          event = Event.log_operation ({sender: sender.user, receiver:receiver, amount: amount, comment: comment})
        end

      else
        raise Error::ForbiddenError.new('not enough points')
      end
  end

  def deposit (amount, comment,parent_operation)
     AccountOperation.create({amount: amount, account_id: self.id, direction: 1, comment: comment, parent_operation: parent_operation})
  end

  def admin_deposit (amount, comment,from_user)
    ActiveRecord::Base.transaction do
      self.deposit( amount, comment, nil)
      #AccountOperation.create({amount: amount, account_id: self.id, direction: 1, comment: comment})
      event = Event.log_operation ({sender: from_user, receiver:self, amount: amount, comment: comment})
    end
  end

  def withdrawal (amount)
     AccountOperation.create({amount: amount, account_id: self.id, direction: -1,parent_operation_id: nil})
  end

  def is_available_to_send  (amount)
    self.balance.amount
  end
end
