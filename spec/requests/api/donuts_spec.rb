require 'swagger_helper'
# https://www.tealhq.com/post/how-teal-keeps-their-api-tests-and-documentation-in-sync

# https://github.com/parrish/json-schema_builder

# https://easy-json-schema.github.io/

RSpec.describe 'api/v1/donuts_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @donuts = create_list(:donut, 10, tenant: @tenant)
  end
  path '/donuts' do
    get 'get all active donuts' do
      tags 'Donuts'
      consumes 'application/json'
      parameter name: :tenant, in: :query, type: :string
      parameter name: :all, in: :query, type: :string, required: false

      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Donuts.response

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:all) {'false'}
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }

        before do |example|
          submit_request(example.metadata)
        end

        schema expected_response_schema

        it 'matches the documented response schema' do |_example|
          json_response = JSON.parse(response.body)
          JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
        end

        it 'returns a valid 200 response' do |_example|
          expect(response.status).to eq(200)
        end
      end

      response '401', 'unauthorized' do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:all) {'false'}
        let(:Authorization) { 'Bearer wrongtoken' }

        before do |example|
          submit_request(example.metadata)
        end

        it 'returns a valid 401 response' do |_example|
          expect(response.status).to eq(401)
        end
      end
    end
  end
end
