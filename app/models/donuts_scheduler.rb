class DonutsScheduler < ApplicationRecord
  include CommonScopes
  belongs_to :profile
  belongs_to :tenant

  before_save :default_values

  def default_values
    self.active = true if active.nil?
    self.every = 'daily'
  end
end
