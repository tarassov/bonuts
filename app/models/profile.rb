# frozen_string_literal: true

class Profile < ApplicationRecord
  after_save :create_accounts
  before_save :default_values
  belongs_to :user
  belongs_to :tenant

  has_one :self_account
  has_one :distrib_account
  belongs_to :department, optional: true

  has_many :requests
  mount_uploader :avatar, AvatarUploader

  validates_presence_of :user, :tenant

  ROLES = %i[system_admin admin store_admin moderator banned]

  def roles=(roles)
    roles = [*roles].map { |r| r.to_sym }
    self.roles_mask = (roles & ROLES).map { |r| 2**ROLES.index(r) }.inject(0, :+)
  end
  
  def roles
    ROLES.reject do |r|
      ((roles_mask.to_i || 0) & 2**ROLES.index(r)).zero?
    end
  end

  def has_role?(role)
    roles.include?(role)
  end

  def default_values
    self.default = true if default.nil?
    self.store_admin = false if store_admin.nil?
  end

  def attached
    !tenant.nil?
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
    Profile.where(tenant: tenant).count do |profile|
      profile.self_account.account_operations.where(direction: 1).sum(:amount) >= score_total
    end
  end

  private

  def create_accounts
    self.self_account = SelfAccount.create({ tenant: tenant, profile: self }) if self_account.nil?
    self.distrib_account = DistribAccount.create({ tenant: tenant, profile: self }) if distrib_account.nil?
  end
end
