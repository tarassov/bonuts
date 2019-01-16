class UserSerializer
  include FastJsonapi::ObjectSerializer
  set_type :user
  attributes :name, :id, :email,:last_name,:first_name,:sex,:notes, :self_account, :distrib_account
end