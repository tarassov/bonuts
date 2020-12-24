class AddsDealToQuiz < ActiveRecord::Migration[6.0]
  def change
    add_reference :quizzes, :deal, foreign_key: true
  end
end
