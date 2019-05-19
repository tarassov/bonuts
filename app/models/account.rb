class Account < ApplicationRecord
  belongs_to :profile
  has_many :account_operations
  belongs_to :tenant


  def balance
    AccountOperation.where(account_id:  self.id).sum("direction*amount")
  end

  def deposit (amount, comment,parent_operation)
     return AccountOperation.create_deposit(amount, self.id, comment, parent_operation)
  end

  def admin_deposit (amount, comment,from_profile)
    if self.is_available_to_deposit (amount)
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
