FactoryBot.define do
  factory :event do
    profile
    tenant
    public { true }
    event_date { Faker::Date.in_date_period }
    content { Faker::TvShows::BigBangTheory.quote }
  end
end
