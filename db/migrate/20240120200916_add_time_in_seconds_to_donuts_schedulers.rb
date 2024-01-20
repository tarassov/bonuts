class AddTimeInSecondsToDonutsSchedulers < ActiveRecord::Migration[7.0]
  def change
    add_column :donuts_schedulers, :time_in_seconds, :integer
  end
end
