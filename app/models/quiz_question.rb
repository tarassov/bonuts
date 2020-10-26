class QuizQuestion < ApplicationRecord
  belongs_to :quiz
  has_many :question_options
  has_many :question_answers
end
