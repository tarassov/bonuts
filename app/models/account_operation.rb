class AccountOperation < ApplicationRecord
  belongs_to :parent_operation, class_name:'AccountOperation',  optional: true


  def self.create_withdrawl amount, account, parent_operation
    opertaion  = AccountOperation.create({amount: amount, account_id: account.id, direction: -1,parent_operation_id: parent_operation.id})      
  end

  def self.create_deposit amount, account, parent_operation
    AccountOperation.transaction do
      operation  = AccountOperation.create({amount: amount, account_id: account.id, direction: 1,parent_operation_id: parent_operation.id})
      Event.log_by_operation(opertaion)
    end
  end

end
