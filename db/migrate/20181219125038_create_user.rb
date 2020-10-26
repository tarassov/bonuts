class CreateUser < ActiveRecord::Migration::Current
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
    end
  end
end
