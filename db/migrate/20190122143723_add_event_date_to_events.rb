# frozen_string_literal: true

class AddEventDateToEvents < ActiveRecord::Migration::Current
  def change
    add_column :events, :event_date, :datetime
  end
end
