require 'swagger_helper'

CIRCLES_TAG =  'Circles'.freeze
CIRCLES_PATH = '/circles'.freeze

RSpec.describe 'api/v1/circles_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @donuts = create_list(:circle, 10, tenant: @tenant)
    @admin = create(:profile, tenant: @tenant, admin: true)
  end
  path CIRCLES_PATH do
    get 'get all active circles' do
      tags CIRCLES_TAG
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string

      security [{ bearer_auth: [] }]

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Circle.array
        run_test!
      end

      response '401', 'unauthorized' do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:Authorization) { 'Bearer wrongtoken' }
        schema SpecSchemas::Error.schema
        run_test!
      end
    end

    post 'create new circle' do
      tags CIRCLES_TAG
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          tenant: { type: :string }
        },
        required: %w[name tenant]
      }

      security [{ bearer_auth: [] }]
      expected_response_schema = SpecSchemas::Circle.array
      response '201', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        let(:body) { { name: 'test name', tenant: @tenant.name } }

        schema expected_response_schema
        run_test!
      end
    end
  end
end
