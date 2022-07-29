# frozen_string_literal: true

require 'faker'
FactoryBot.define do
  factory :tenant do
    name { "tenant#{Faker::Number.number(digits: 10)}" }

    factory :tenant_with_profiles do
      transient do
        profiles_count { 10 }
        admin_count { 1 }
      end
      after(:create) do |tenant, evaluator|
        department1 = create(:department, tenant:)
        department2 = create(:department, tenant:)
        create_list(:profile, evaluator.profiles_count / 2, tenant:, active: true, admin: false,
                                                            department: department1)
        create_list(:profile, evaluator.profiles_count / 2, tenant:, active: true, admin: false,
                                                            department: department2)
        create_list(:profile, evaluator.admin_count, tenant:, admin: true)
        profile_head_1  = create(:profile, tenant:, active: true, admin: false, department: department1)
        profile_head_2  = create(:profile, tenant:, active: true, admin: false, department: department2)
        department1.head_profile =  profile_head_1
        department2.head_profile =  profile_head_2
        department1.save
        department2.save
      end
    end
  end
end
