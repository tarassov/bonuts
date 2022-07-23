FactoryBot.define do
    factory :event do
      profile
      content {Faker::TvShows::BigBangTheory.quote}
    end
  end
  