class AddEventDateToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :event_date, :datetime
  end
end
