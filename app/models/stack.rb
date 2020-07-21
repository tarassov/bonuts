class Stack < ApplicationRecord
    belongs_to :stackable, polymorphic: true    
    belongs_to :deal
  end
  