class Department < ApplicationRecord
  belongs_to :head_profile, class_name: 'Profile', optional: true
  belongs_to :tenant
  has_many :profiles
end
