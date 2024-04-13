class CreateProfileNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table(:profile_notifications) do |t|
      t.references(:profile, null: false, foreign_key: true)
      t.references(:tenant_plugin, null: false, foreign_key: true)
      t.boolean(:active)
      t.boolean(:disabled)

      t.timestamps
    end
  end
end
