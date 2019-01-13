class User < ApplicationRecord
  has_secure_password

  # validations
  validates_presence_of :name, :email, :password_digest,:last_name,:first_name
  validates :email, uniqueness: true


end
