# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/account_operations_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profile1 = @tenant.profiles[2]
    @profile2 = @tenant.profiles[3]
    acc = AccountOperation.create({ amount: 100, account: @profile1.distrib_account,
      direction: 1, deal: Deal.new })
    acc.save

  end
  path '/account_operations' do
    post 'send points' do
      tags 'Operations'
      consumes 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          tenant: { type: :string },
          amount: { type: :number},
          from_profile_id: { type: :string },
          to_profile_ids: { type: :array, items: { type: :string }},
          comment: { type: :string },
          share_for_all: { type: :boolean },
          is_for_distrib: { type: :boolean },
          burn_old: { type: :boolean },
          to_self_account: { type: :boolean },
        },
        required: %w[amount to_profile_ids comment tenant]
      }
      security [{ bearer_auth: [] }]


      expected_response_schema = SpecSchemas::Response.array_response( SpecSchemas::AccountOperation.schema )

      response '201', 'success' do
        let(:body) { 
          { 
            amount: 10, 
            tenant: @tenant.name,
            to_profile_ids:[@profile2.id],
            comment: 'test comment'
          } 
        }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @profile1.user.id)}" }      
        run_test!
      end

      response '400', 'bad request' do
        let(:body) { 
          { 
            amount: 1000, 
            tenant: @tenant.name,
            to_profile_ids:[@profile2.id],
            comment: 'test comment'
          } 
        }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @profile1.user.id)}" }
        run_test!
      end
    end
  end
end
 
