class DepartmentSerializer
  include FastJsonapi::ObjectSerializer
  set_type :department
  attributes :name, :id

  cache_options enabled: true, cache_length: 2.hours
end
