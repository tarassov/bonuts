class AccountOperation < ApplicationRecord
  belongs_to :parent_operation, class_name:'AccountOperation',  optional: true

end
