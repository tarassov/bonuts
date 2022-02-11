class Deal < ApplicationRecord
  belongs_to :profile
  has_many :account_operations
  has_many :stacks
  has_many :requests, through: :stacks, source: :stackable, source_type: 'Request'

  enum deal_type: {
    buy: "buy" , 
    refund_regard: "refund_regard",
    admin_deposit: "admin_deposit", 
    accept_invitation: "accept_invitation",
    new_invitation: "new_invitation", 
    decline_invitation: "decline_invitation",
    activate_regard: "activate_regard",
    rollback_regard: "rollback_regard", 
    close_regard:"close_regard", 
    join_to_tenant: "join_to_tenant",
    new_user: "new_user",
    share_all: "share_all",
    deposit: "deposit",
    transfer: "transfer",
    create_quiz: "create_quiz" , 
    add_quiz_answers: "add_quiz_answers",    

  }
end
