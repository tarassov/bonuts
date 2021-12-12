class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :from_user, class_name: 'User', foreign_key: 'from_user_id'
  belongs_to :tenant
  has_many :stacks, as: :stackable
  has_many :deals, through: :stacks

  attribute :closed, default: -> { false }
  attribute :activated, default: -> { false }

  scope :active, ->(user, tenant) { where(user: user, tenant: tenant) }
end
