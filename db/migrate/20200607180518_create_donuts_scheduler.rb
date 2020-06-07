class CreateDonutsScheduler < ActiveRecord::Migration[5.2]
  def change
    create_table :donuts_schedulers do |t|
      t.string :type
      t.references :tenant, foreign_key: true
      t.references :profile, foreign_key: true
      t.integer :day
      t.integer :amount
      t.string :comment
      t.boolean :burn_old
      t.boolean :active
    end
  end
end
