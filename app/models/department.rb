class Department< ApplicationRecord
  belongs_to :head_user, class_name: "User"
  has_many :positions
end
