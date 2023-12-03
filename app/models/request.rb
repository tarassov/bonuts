# frozen_string_literal: true

class Request < ApplicationRecord
  generate_public_uid
  before_save :default_values
  belongs_to :profile
  belongs_to :donut
  has_many :stacks, as: :stackable, dependent: :destroy
  has_many :deals, through: :stacks

  def default_values
    self.deleted ||= false
  end

  scope :by_profile, lambda { |profile_id|
    where(profile_id:)
  }
end
