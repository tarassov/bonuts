class CreateAccount < ActiveRecord::Migration::Current
  def change
    create_table :accounts do |t|
      t.string :type
      t.references :user, foreign_key: true
    end
  end
end
