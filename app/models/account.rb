class Account < ApplicationRecord
  belongs_to :profile
  has_many :account_operations
  belongs_to :tenant


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

          op_event = Event.log_operation ({sender: sender.profile, receiver:receiver, amount: amount, comment: comment, public: 1})
        end


      else
        raise Error::ForbiddenError.new('not enough points')
      end
  end

  def deposit (amount, comment,parent_operation)
     return AccountOperation.create_deposit(amount, self.id, comment, parent_operation)
  end

  def admin_deposit (amount, comment,from_profile)
    if (self.is_available_to_deposit)
      ActiveRecord::Base.transaction do
        self.deposit( amount, comment, nil)
        event = Event.log_operation ({sender: from_profile, receiver:self, amount: amount, comment: comment, public: 0})
      end
    end  
  end

  def withdrawal (amount)
    if (self.is_available_to_withdrawl)
      return AccountOperation.create_withdrawl amount, self.id, nil
    else
      return nil
    end
  end

  def is_available_to_withdrawl  (amount)
    return self.balance >= amount
  end

  def is_available_to_deposit (amount)
    return true
  end
end
