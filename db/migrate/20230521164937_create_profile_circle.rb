class CreateProfileCircle < ActiveRecord::Migration[7.0]
  def change
    create_table :profile_circles do |t|
      t.references :profile, null: false, foreign_key: true
      t.references :circle, null: false, foreign_key: true

      t.timestamps
    end
  end
end
