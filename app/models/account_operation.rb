class AccountOperation < ApplicationRecord
  belongs_to :parent_operation, class_name:'AccountOperation',  optional: true


  def self.create_withdrawl amount, account, parent_operation
    AccountOperation.transaction do
      AccountOperation.create({amount: amount, account_id: account.id, direction: -1,parent_operation_id: parent_operation.id})
      Event.log_withdraw({sender: account.profile, amount: amount,  public: 1})
    end
  end

  def self.create_deposit amount, account, parent_operation
    AccountOperation.transaction do
      AccountOperation.create({amount: amount, account_id: account.id, direction: 1,parent_operation_id: parent_operation.id})
    end
  end

end
