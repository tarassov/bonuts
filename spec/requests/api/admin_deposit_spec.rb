# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/account_operations_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profile1 = @tenant.profiles[2]
    @profile2 = @tenant.profiles[3]
    @admin = create(:profile, tenant: @tenant, admin: true)
  end
  path '/admin_deposit' do
    post 'Send donuts or bonuts to profile account as admin' do
      tags 'Operations'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          tenant: { type: :string },
          amount: { type: :number },
          account_type: { type: :string, "description": "Recipient's account type distrib or self", "default": 'distrib', "enum": %w[
            self
            distrib
          ] },
          to_profile_ids: { type: :array, items: { type: :number } },
          comment: { type: :string }
        },
        required: %w[amount to_profile_ids comment tenant]
      }
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Response.array_response(SpecSchemas::AccountOperation.schema)

      response '200', 'success' do
        let(:body) do
          {
            amount: 10,
            tenant: @tenant.name,
            to_profile_ids: [@profile2.id],
            comment: 'test comment',
            account_type: 'distrib'
          }
        end
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        schema expected_response_schema
        run_test!
      end

      response '400', 'bad request' do
        let(:body) do
          {
            amount: 1000,
            tenant: @tenant.name,
            to_profile_ids: [@profile2.id],
            comment: 'test comment'
          }
        end
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @profile1.user.id)}" }
        run_test!
      end
    end
  end
end
