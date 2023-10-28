# frozen_string_literal: true

class Profile < ApplicationRecord
  after_save :create_accounts
  before_save :default_values
  belongs_to :user
  belongs_to :tenant
  has_one :self_account
  has_one :distrib_account
  belongs_to :department, optional: true
  attribute :bot, default: -> { false }
  has_many :requests, dependent: :destroy
  has_many :circles_profiles, dependent: :destroy
  has_many :circles, through: :circles_profiles, dependent: :destroy
  has_many :stacks, as: :stackable
  has_many :deals, through: :stacks
  mount_uploader :avatar, AvatarUploader

  validates :user, :tenant, presence: true

  ROLES = %w[system_admin admin store_admin moderator banned].freeze

  scope :today_birthday, lambda {
                           where('EXTRACT(month FROM birthdate) = ? AND EXTRACT(day FROM birthdate) = ?', Date.today.month, Date.today.day)
                         }

  scope :upcoming_birthday, lambda {
                              where('EXTRACT(month FROM birthdate) = ? AND EXTRACT(day FROM birthdate) = ?', 1.day.from_now.month, 1.day.from_now.day)
                            }
  scope :feb_29_birthday, lambda {
    where('EXTRACT(month FROM birthdate) = ? AND EXTRACT(day FROM birthdate) = ?', 2, 29)
  }

  def roles=(roles)
    self.admin = roles && roles.include?('admin')
    self.store_admin = roles && roles.include?('store_admin')
    self.roles_mask = (roles & ROLES).map { |r| 2**ROLES.index(r) }.sum
  end

  def roles
    ROLES.reject do |r|
      ((roles_mask.to_i || 0) & 2**ROLES.index(r)).zero?
    end
  end

  def admin?
    role?('admin') || admin
  end

  def role?(role)
    roles.include?(role)
  end

  def temp_profile?
    id.nil?
  end

  def default_values
    self.default = true if default.nil?
    self.store_admin = false if store_admin.nil?
  end

  def attached
    !tenant.nil?
  end

  delegate :name, to: :user, prefix: true

  def boss_profile
    department.head_profile if department
  end

  delegate :name, to: :user, prefix: true

  delegate :email, to: :user, prefix: true

  def ranking
    Profile.where(tenant:).count do |profile|
      profile.self_account.account_operations.where(direction: 1).sum(:amount) >= score_total
    end
  end

  private

  def create_accounts
    self.self_account = SelfAccount.create({ tenant:, profile: self }) if self_account.nil?
    self.distrib_account = DistribAccount.create({ tenant:, profile: self }) if distrib_account.nil?
  end
end
