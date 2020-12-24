class CreateQuestionAnswers < ActiveRecord::Migration::Current
  def change
    create_table :question_answers do |t|
      t.references :quiz_question, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true
      t.string :value
      t.boolean :anonymous

      t.timestamps
    end
  end
end
