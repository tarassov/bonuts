# frozen_string_literal: true

class Profile < ApplicationRecord
  after_save :create_accounts
  before_save :default_values
  belongs_to :user
  belongs_to :tenant

  has_one :self_account
  has_one :distrib_account
  belongs_to :department, optional: true

  has_many :profile_assets
  mount_uploader :avatar, AvatarUploader

  validates_presence_of :user, :tenant

  def default_values
    self.default = true if self.default.nil?
    self.store_admin = false if self.store_admin.nil? 
  end


  def boss_profile
    department.head_profile if department
  end

  def user_name
    user.name
  end

  def user_email
    user.email
  end

  def ranking
    Profile.where(tenant: tenant).count { |profile| profile.self_account.account_operations.where(direction: 1).sum(:amount) >= score_total }
  end

  private  
  def create_accounts
    if self_account.nil?
      self.self_account = SelfAccount.create({ tenant: tenant, profile: self })
    end
    if distrib_account.nil?
      self.distrib_account = DistribAccount.create({ tenant: tenant, profile: self })
    end
  end
  
end
