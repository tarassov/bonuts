# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_many :profiles, dependent: :destroy
  has_many :users, through: :profiles
  has_many :tenant_plugins, dependent: :destroy
  has_many :plugins, through: :tenant_plugins
  mount_uploader :logo, LogoUploader
  validates :name, presence: true
  validates :name, uniqueness: true

  attribute :caption, default: -> { '' }
  attribute :active, default: -> { true }
  attribute :domain, default: -> { '' }
  attribute :demo, default: -> { false }
  attribute :welcome_points, default: -> { 10 }
  attribute :welcome_donuts, default: -> { 10 }
  attribute :email_notification, default: -> { true }
  attribute :birthday_donuts, default: -> { 0 }
  attribute :birthday_points, default: -> { 0 }
  attribute :join_to_project_donuts, default: -> { 10 }
  attribute :join_to_project_points, default: -> { 0 }
  attribute :join_to_company_donuts, default: -> { 0 }
  attribute :join_to_company_points, default: -> { 0 }
  attribute :use_departments, default: -> { false }
  attribute :test, default: -> { false }
  attribute :bot, default: -> { false }

  scope :only_active, -> { where(active: true) }

  def user_attached(user)
    users.include?(user)
  end

  def service_bot
    profiles.find_by(bot: true)
  end
end
