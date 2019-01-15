class AccountSerializer
  include FastJsonapi::ObjectSerializer
  set_type :account
  attributes :balance, :id
end
