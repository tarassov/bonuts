class AccountSerializer
  include FastJsonapi::ObjectSerializer
  set_type :account
  attributes :balance, :id

 #cache_options enabled: true, cache_length: 2.hours
end
