class AddTypeToPlugins < ActiveRecord::Migration[7.0]
  def change
    add_column(:plugins, :type, :string)
    add_column(:plugins, :default_state, :boolean)
  end
end
