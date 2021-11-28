FactoryBot.define do
  factory :tenant_setting do
    tenant { nil }
    tenant_property { nil }
    value { "MyString" }
  end
end
