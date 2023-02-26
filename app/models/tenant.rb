# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_many :profiles
  has_many :users, through: :profiles
  has_many :tenant_plugins
  has_many :plugins, through: :tenant_plugins
  mount_uploader :logo, LogoUploader
  validates_presence_of :name
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

  def user_attached(user)
    users.include?(user)
  end
end
