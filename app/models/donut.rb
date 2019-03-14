class Donut < ApplicationRecord
  belongs_to :user
  belongs_to :tenant

  before_save :default_values

  def default_values
   self.acitve = true if self.active.nil?

 end

end
