class Department< ApplicationRecord
  has_one :head_user, class_name: "User"
  has_many :positions
end
