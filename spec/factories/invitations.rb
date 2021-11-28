FactoryBot.define do
  factory :invitation do
    user { nil }
    from_user { nil }
    tenant { nil }
    expiration { '2021-09-07' }
  end
end
