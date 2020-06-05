# frozen_string_literal: true

class ProfileAsset < ApplicationRecord
  generate_public_uid
  belongs_to :profile
  belongs_to :donut

  scope :by_profile, lambda { |profile_id|
    where(profile_id: profile_id)
  }
end
