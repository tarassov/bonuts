class Deal < ApplicationRecord
    belongs_to :profile
    has_many :account_operations

end
  