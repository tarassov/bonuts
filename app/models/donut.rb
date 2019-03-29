class Donut < ApplicationRecord
  belongs_to :user
  belongs_to :tenant

  before_save :default_values

  def default_values
   self.active = true if self.active.nil?
   self.expiration_date = Date.today+2.years if self.expiration_date.nil?
 end

end
