class AddsDealToQuizQuestions < ActiveRecord::Migration[6.0]
  def change
    add_reference :quiz_questions, :deal, foreign_key: true
  end
end
