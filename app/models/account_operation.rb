class AccountOperation < ApplicationRecord
  belongs_to :parent_operation, class_name:'AccountOperation',  optional: true
  belongs_to :account

  def self.create_withdrawl args
    operation  = AccountOperation.create(args.merge({direction: -1}))
  end

  def self.create_deposit args
    operation  = AccountOperation.create(args.merge({direction: 1}))
  end


end
