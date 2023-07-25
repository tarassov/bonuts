# frozen_string_literal: true

require 'swagger_helper'
# https://www.tealhq.com/post/how-teal-keeps-their-api-tests-and-documentation-in-sync

# https://github.com/parrish/json-schema_builder

# https://easy-json-schema.github.io/

RSpec.describe 'api/v1/profiles_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @admin = create(:profile, tenant: @tenant, admin: true)
  end
  path '/profile' do
    get 'get current profile' do
      tags 'Profile'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Profile.profile

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema expected_response_schema

        before do |example|
          submit_request(example.metadata)
        end

        it 'matches the documented response schema' do |_example|
          json_response = JSON.parse(response.body)
          JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
        end

        it 'returns a valid 200 response' do |_example|
          expect(response.status).to eq(200)
        end
      end
    end
  end
  path '/profiles/{id}' do
    get 'get profile' do
      tags 'Profile'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :tenant, in: :query, type: :string
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Profile.profile

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:id) { @tenant.profiles[0].user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema expected_response_schema

        before do |example|
          submit_request(example.metadata)
        end

        it 'matches the documented response schema' do |_example|
          json_response = JSON.parse(response.body)
          JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
        end

        it 'returns a valid 200 response' do |_example|
          expect(response.status).to eq(200)
        end
      end
    end

    put 'update current profile' do
      tags 'Profile'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          first_name: { type: :string },
          last_name: { type: :string },
          department_id: { type: :number, nullable: true },
          position: { type: :string },
          admin: { type: :boolean },
          active: { type: :boolean },
          tenant: { type: :string }
        }
      }
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Profile.profile

      response '200', 'success' do
        let(:id) { @tenant.profiles[0].user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        let(:body) do
          { email: 'tony@bonuts.ru', first_name: 'Тони1', last_name: 'Старк', department_id: nil,
            position: 'Iron man', admin: true, active: true, tenant: @tenant.name }
        end

        schema expected_response_schema

        run_test!
      end
    end
  end

  path '/profiles/{id}/set_activity' do
    post 'set profile activity (admin only)' do
      tags 'Profile'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          active: { type: :boolean },
          tenant: { type: :string }
        }
      }
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Profile.response

      response '200', 'success' do
        let(:id) { @tenant.profiles[0].user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        let(:body) do
          {  active: false, tenant: @tenant.name }
        end

        schema expected_response_schema

        run_test!
      end
    end
  end
  path '/profiles' do
    get 'get all active tenant profiles' do
      tags 'Profiles'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string

      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Profile.response

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema expected_response_schema
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:tenant) { create(:tenant_with_profiles).name }
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
