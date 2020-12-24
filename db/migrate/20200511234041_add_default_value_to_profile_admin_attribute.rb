class AddDefaultValueToProfileAdminAttribute < ActiveRecord::Migration::Current
# That's the more generic way to change a column
def up
  change_column :profiles, :admin, :boolean, default: false
end

def down
  change_column :profiles, :admin, :boolean, default: nil
end
end
