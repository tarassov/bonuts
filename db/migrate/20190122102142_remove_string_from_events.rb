class RemoveStringFromEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :string
  end
end
