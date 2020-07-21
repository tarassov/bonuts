class RemoveTypeFromDonutsSchedulers < ActiveRecord::Migration[5.2]
  def change
    remove_column :donuts_schedulers, :type
    add_column :donuts_schedulers, :every, :string
  end
end
