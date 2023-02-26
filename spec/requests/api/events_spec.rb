# frozen_string_literal: true

require 'swagger_helper'
RSpec.describe 'api/v1/events_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @events = create_list(:event, 10, profile: @tenant.profiles[0], tenant: @tenant)
    @events2 = create_list(:event, 10, profile: @tenant.profiles[1], tenant: @tenant)
  end
  path '/events' do
    get 'get events list' do
      tags 'Events'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string
      parameter name: :showMine, in: :query, type: :string, required: false
      parameter name: :page, in: :query, type: :number

      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Event.response

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:showMine) { 'false' }
        let(:page) { 1 }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }

        before do |example|
          submit_request(example.metadata)
        end

        schema expected_response_schema

        it 'matches the documented response schema' do |_example|
          json_response = JSON.parse(response.body)
          JSON::Validator.validate!(expected_response_schema, json_response, strict: false)
        end

        it 'returns a valid 200 response' do |_example|
          expect(response.status).to eq(200)
        end
      end

      response '401', 'unauthorized' do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:showMine) { 'false' }
        let(:page) { 1 }
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
  path '/events/{id}' do
    put 'like event' do
      tags 'Events'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          like: { type: :boolean },
          tenant: { type: :string }
        },
        required: %w[like tenant]
      }

      security [{ bearer_auth: [] }]

      response '200', 'event liked' do
        let(:id) { create(:event, profile: @tenant.profiles[0], tenant: @tenant).id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        let(:body) { { like: true, tenant: @tenant.name } }
        schema SpecSchemas::Response.response_object(SpecSchemas::Event.response)
        run_test!
      end
    end
  end
end
