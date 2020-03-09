class Profile < ApplicationRecord
  after_save :default_values
  belongs_to :user
  belongs_to :tenant

  has_one :self_account
  has_one :distrib_account
  belongs_to :department, optional: true

  has_many :profile_assets
  mount_uploader :avatar, AvatarUploader

  def default_values
      self.self_account = SelfAccount.create({tenant: self.tenant, profile:self}) if self.self_account.nil?
      self.distrib_account = DistribAccount.create({tenant: self.tenant, profile:self}) if self.distrib_account.nil?
            
  end

  def boss_profile
    self.department.head_profile if self.department
  end

  def user_name
    user.name
  end

  def ranking
    Profile.where(tenant: self.tenant).count {|profile| profile.self_account.account_operations.where(direction: 1).sum(:amount) >= self.score_total}
  end





end
