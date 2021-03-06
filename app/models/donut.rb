# frozen_string_literal: true

class Donut < ApplicationRecord
  belongs_to :profile, optional: true
  belongs_to :tenant

  before_save :default_values
  has_many :images, as: :imageable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy
  mount_uploader :logo, LogoUploader

  validates_presence_of :name

  def default_values
    self.active = true if active.nil?
    self.expiration_date = Date.today + 10.years if expiration_date.nil?
  end

  def has_remains
    return self.expiration_date >= Date.today
  end
end
