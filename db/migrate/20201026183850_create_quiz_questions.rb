class CreateQuizQuestions < ActiveRecord::Migration::Current
  def change
    create_table :quiz_questions do |t|
      t.string :description
      t.references :quiz, null: false, foreign_key: true
      t.boolean :obligatory
      t.integer :from
      t.integer :to

      t.timestamps
    end
  end
end
