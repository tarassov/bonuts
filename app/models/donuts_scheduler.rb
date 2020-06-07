class DonutsScheduler < ApplicationRecord
belongs_to :profile
belongs_to :tenant

before_save :default_values

def default_values
  self.active = true if active.nil?  
  self.type = 'daily'  
end

end
