# frozen_string_literal: true

class CreateEventTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :event_types do |t|
      t.string :name
      t.string :description
    end
  end
end
