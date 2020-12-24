class RemoveTypeFromDonutsSchedulers < ActiveRecord::Migration::Current
  def change
    remove_column :donuts_schedulers, :type
    add_column :donuts_schedulers, :every, :string
  end
end
