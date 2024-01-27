class AddTimeToDonutsSchedulers < ActiveRecord::Migration[7.0]
  def change
    add_column :donuts_schedulers, :weekday, :integer
    add_column :donuts_schedulers, :execute_time, :timestamp
    add_column :donuts_schedulers, :timezone, :string
    add_column :donuts_schedulers, :name, :string
  end
end
