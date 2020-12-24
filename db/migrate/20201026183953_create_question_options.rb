class CreateQuestionOptions < ActiveRecord::Migration::Current
  def change
    create_table :question_options do |t|
      t.integer :sort_order
      t.references :quiz_question, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
