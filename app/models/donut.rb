# frozen_string_literal: true

class Donut < ApplicationRecord
  include Likeable
  belongs_to :profile, optional: true
  belongs_to :tenant

  has_many :images, as: :imageable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy
  mount_uploader :logo, LogoUploader

  validates_presence_of :name

  attribute :description, default: -> { '' }
  attribute :on_stock, default: -> { 0 }
  attribute :supply_days, default: -> { 0 }
  attribute :active, default: -> { true }
  attribute :expiration_date, default: -> { Date.today + 10.years }

  def has_remains
    expiration_date >= Date.today
  end
end
