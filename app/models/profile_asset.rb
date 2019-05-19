class ProfileAsset < ApplicationRecord
  belongs_to :profile
  belongs_to :donut

  scope :by_profile, ->(profile_id) {
    where(profile_id: profile_id)
  }

  
end
