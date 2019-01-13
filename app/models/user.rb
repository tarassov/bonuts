class User < ApplicationRecord
  has_secure_password
  before_save :default_values

  # validations
  validates_presence_of :name, :email, :password_digest,:last_name,:first_name
  validates :email, uniqueness: true
  has_one :self_account
  has_one :distrib_account

  def default_values
      self.self_account = SelfAccount.create if self.self_account.nil?
      self.distrib_account = DistribAccount.create if self.distrib_account.nil?
  end

end
