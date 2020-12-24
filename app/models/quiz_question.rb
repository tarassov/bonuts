class QuizQuestion < ApplicationRecord
  belongs_to :quiz
  belongs_to :deal
  has_many :question_options
  has_many :question_answers
end
