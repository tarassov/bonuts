class UserSerializer
  include FastJsonapi::ObjectSerializer
  set_type :user
  attributes :name, :id, :email
end
