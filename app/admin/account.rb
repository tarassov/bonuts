ActiveAdmin.register Account do
  permit_params :type, :user_id, :account_id
end
