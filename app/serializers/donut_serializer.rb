class DonutSerializer
  include FastJsonapi::ObjectSerializer
  set_type :donut
  attributes :name, :price, :id
end
