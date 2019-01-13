ActiveAdmin.register User do
  permit_params :name, :email, :user_id
end
