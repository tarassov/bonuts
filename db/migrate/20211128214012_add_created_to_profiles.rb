class AddCreatedToProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :profiles, :created_at, :datetime
    add_column :profiles, :updated_at, :string
    add_column :profiles, :datetime, :string
  end
end
