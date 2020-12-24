class AddsDealToQuizAnswers < ActiveRecord::Migration[6.0]
  def change
    add_reference :question_answers, :deal, foreign_key: true
  end
end
