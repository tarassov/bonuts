class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :from_user,class_name: 'User',foreign_key: 'from_user_id'
  belongs_to :tenant
  has_many :stacks, as: :stackable
  has_many :deals, through:  :stacks
end
