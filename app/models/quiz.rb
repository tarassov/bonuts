class Quiz < ApplicationRecord
  belongs_to :tenant
  belongs_to :profile
  belongs_to :deal

  has_many :quiz_questions

  validates_presence_of :name
end
