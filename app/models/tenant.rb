# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_many :profiles
  has_many :users, through: :profiles
  has_many :tenant_plugins
  has_many :plugins, through: :tenant_plugins
  mount_uploader :logo, LogoUploader
  validates_presence_of :name
  validates :name, uniqueness: true

  attribute :caption, default: -> { "" }
  attribute :active, default: -> { true }
  attribute :domain, default: -> { "" }
  attribute :demo, default: -> { false }
  attribute :welcome_points, default: -> { 10 }
  attribute :welcome_donuts, default: -> { 10 }
  
  def user_attached(user)
    users.include?(user)
  end
end
