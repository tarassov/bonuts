class CreateQuizzes < ActiveRecord::Migration::Current
  def change
    create_table :quizzes do |t|
      t.string :name
      t.string :description
      t.references :tenant, null: false, foreign_key: true
      t.references :profile, null: false, foreign_key: true
      t.boolean :active
      t.boolean :closed
      t.string :uuid
      t.timestamps
    end
  end
end
