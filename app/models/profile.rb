class Profile < ApplicationRecord
  before_save :default_values

  has_one :self_account
  has_one :distrib_account

  def default_values
      self.self_account = SelfAccount.create if self.self_account.nil?
      self.distrib_account = DistribAccount.create if self.distrib_account.nil?
      self.active  = true
  end




end
