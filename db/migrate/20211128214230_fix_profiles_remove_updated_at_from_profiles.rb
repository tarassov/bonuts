class FixProfilesRemoveUpdatedAtFromProfiles < ActiveRecord::Migration[6.0]
  def change
    remove_column :profiles, :updated_at
    remove_column :profiles, :datetime

    add_column :profiles, :updated_at, :datetime
  end
end
