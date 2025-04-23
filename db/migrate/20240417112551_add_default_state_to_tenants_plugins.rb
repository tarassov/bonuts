class AddDefaultStateToTenantsPlugins < ActiveRecord::Migration[7.0]
  def change
    add_column(:tenant_plugins, :default_state, :boolean)
  end
end
