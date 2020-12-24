# frozen_string_literal: true

class AddProfileToEvents < ActiveRecord::Migration::Current
  def change
    add_reference :events, :profile, foreign_key: true
  end
end
