# frozen_string_literal: true
require 'faker'
FactoryBot.define do
  factory :tenant do
    name { "tenant#{Faker::Number.number(digits: 10)}" }

    # user_with_posts will create post data after the user has been created
    factory :tenant_with_profiles do
      # posts_count is declared as a transient attribute and available in
      # attributes on the factory, as well as the callback via the evaluator
      transient do
        profiles_count { 10 }
        admin_count {1}
      end

      # the after(:create) yields two values; the user instance itself and the
      # evaluator, which stores all values from the factory, including transient
      # attributes; `create_list`'s second argument is the number of records
      # to create and we make sure the user is associated properly to the post
      after(:create) do |tenant, evaluator|
        department1 = create(:department, tenant: tenant)
        department2 = create(:department, tenant: tenant)
        create_list(:profile, evaluator.profiles_count/2, tenant: tenant, active:true, admin: false,department: department1)
        create_list(:profile, evaluator.profiles_count/2, tenant: tenant,active:true, admin: false,department: department2)
        create_list(:profile, evaluator.admin_count, tenant: tenant, admin: true)
        profile_head_1  = create(:profile,tenant: tenant,active:true, admin: false,department: department1)
        profile_head_2  = create(:profile,tenant: tenant,active:true, admin: false,department: department2)
        department1.head_profile =  profile_head_1
        department2.head_profile =  profile_head_2
        department1.save
        department2.save
      end

    end
  end
end
