# frozen_string_literal: true

class CreateEventTypes < ActiveRecord::Migration::Current
  def change
    create_table :event_types do |t|
      t.string :name
      t.string :description
    end
  end
end
