# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/account_operations_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @user1 = @tenant.profiles[2].user
    @user1.confirm_token = 'my_confirm_token'
    @user1.save

    @user2 = @tenant.profiles[3].user
    @user2.password = '123'
    @user2.save

    @user3 = @tenant.profiles[4].user
    @user3.password = '123'
    @user3.email_confirmed = true
    @user3.save
  end
  path '/account_operations' do
    post 'send points' do
      tags 'Operations'
      consumes 'application/json'
      amount,
      from_profile_id,
      to_profile_ids,
      comment,
      is_for_distrib,
      share_for_all,
      burn_old,
      to_self_account
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          tenant: { type: :string },
          amount: { type: :number},
          from_profile_id: { type: :string },
          to_profile_ids: { type: :array, items: { type: :string },
          comment: { type: :string },
          share_for_all: { type: :boolean },
          is_for_distrib: { type: :boolean },
          burn_old: { type: :boolean },
          to_self_account: { type: :boolean },
        },
        required: %w[amount from_profile_id to_profile_ids comment tenant]
      }

      expected_response_schema = SpecSchemas::User.response

      response '201', 'success' do
        let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex', password: '123456' } }
        run_test!
      end

      response '400', 'bad request' do
        let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex' } }
        run_test!
      end
    end
  end
end
 
