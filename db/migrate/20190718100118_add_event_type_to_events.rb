# frozen_string_literal: true

class AddEventTypeToEvents < ActiveRecord::Migration::Current
  def change
    add_reference :events, :event_type, foreign_key: true
  end
end
