class Deal < ApplicationRecord
    belongs_to :profile
    has_many :account_operations
    has_many :stacks
    has_many :profile_assets, through: :stacks, source: :stackable, source_type: "ProfileAsset"

end
  