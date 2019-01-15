class Account < ApplicationRecord
  belongs_to :user
  has_many :account_operations


  def balance
    AccountOperation.where(account_id:  self.id).sum("direction*amount")
  end
end
