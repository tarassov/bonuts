class AddBioToProfile < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :bio, :string
    add_column :profiles, :phone, :string
    add_column :profiles, :birthdate, :string
    add_column :profiles, :in_date, :string
  end
end
