class AccountSerializer
  include FastJsonapi::ObjectSerializer
  set_type :account
  attributes :saldo, :id
end
