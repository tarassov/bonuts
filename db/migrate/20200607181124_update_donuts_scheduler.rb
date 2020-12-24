class UpdateDonutsScheduler < ActiveRecord::Migration::Current
  def change
    add_column :donuts_schedulers, :created_at, :datetime
    add_column :donuts_schedulers, :updated_at, :datetime
  end
end
