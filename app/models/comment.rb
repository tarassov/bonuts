class Comment < ApplicationRecord
    belongs_to :commentable, :polymorphic => true
    has_many :likes, :as => :likeable, :dependent => :destroy
    belongs_to :profile
end