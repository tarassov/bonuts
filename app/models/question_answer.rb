class QuestionAnswer < ApplicationRecord
  belongs_to :quiz_question
  belongs_to :profile
end
