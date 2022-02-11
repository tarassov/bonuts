class Deal < ApplicationRecord
  belongs_to :profile
  has_many :account_operations
  has_many :stacks
  has_many :profile_assets, through: :stacks, source: :stackable, source_type: 'ProfileAsset'

  enum deal_type: {
    buy: "buy" , 
    refund_regard: "refund_regard",
    admin_deposit: "admin_deposit", 
    accept_invitation: "accept_invitation",
    new_invitation: "new_invitation", 
    decline_invitation: "decline_invitation",
    create_quiz: "create_quiz" , 
    activate_regard: "activate_regard",
    rollback_regard: "rollback_regard", 
    close_regard:"close_regard", 
    join_to_tenant: "join_to_tenant",
    new_user: "new_user"
  }
end
