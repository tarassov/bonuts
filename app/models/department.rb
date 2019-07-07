class Department< ApplicationRecord
  belongs_to :head_profile, class_name: "Profile", optional: true
  has_many :positions
end
