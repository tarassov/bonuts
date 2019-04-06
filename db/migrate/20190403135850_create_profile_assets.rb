class CreateProfileAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :profile_assets do |t|
      t.references :profile, foreign_key: true
      t.references :donut, foreign_key: true
      t.datetime :date_create
      t.datetime :date_used
      t.boolean :enabled
    end
  end
end
