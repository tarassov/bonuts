# frozen_string_literal: true

class Donut < ApplicationRecord
  belongs_to :profile, optional: true
  belongs_to :tenant

  before_save :default_values

  def default_values
    self.active = true if active.nil?
    self.expiration_date = Date.today + 2.years if expiration_date.nil?
 end
end
