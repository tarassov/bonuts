FactoryBot.define do
    factory :event do
      profile
      tenant
      content {Faker::TvShows::BigBangTheory.quote}
    end
  end
  