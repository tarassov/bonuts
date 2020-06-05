# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_many :profiles
  mount_uploader :logo, LogoUploader
  validates_presence_of :name
  validates :name, uniqueness: true
end
