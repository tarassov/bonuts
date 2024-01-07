# frozen_string_literal: true

require 'swagger_helper'
SCHEDULERS_TAG =  'Schedulers'
SCHEDULERS_PATH = '/donuts_schedulers'
SCHEDULERS_PATH_ID = '/donuts_schedulers/{id}'

RSpec.describe 'api/v1/donuts_schedulers_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @schedulers = create_list(:donuts_scheduler, 10, profile: @tenant.profiles[0], tenant: @tenant)
    @admin = create(:profile, tenant: @tenant, admin: true)
  end
  path SCHEDULERS_PATH do
    get 'get all active schedulers' do
      tags SCHEDULERS_TAG
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string

      security [{ bearer_auth: [] }]

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Scheduler.array
        run_test!
      end

      response '401', 'unauthorized' do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:Authorization) { 'Bearer wrongtoken' }
        schema SpecSchemas::Error.schema
        run_test!
      end
    end
    post 'create new scheduler' do
      tags SCHEDULERS_TAG
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
      expected_response_schema = SpecSchemas::Scheduler.scheduler
      response '201', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        let(:body) { { name: 'test name', tenant: @tenant.name } }

        schema expected_response_schema
        run_test!
      end
    end
  end
  path SCHEDULERS_PATH_ID do
    get 'get scheduler' do
      tags SCHEDULERS_TAG
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :number
      parameter name: :tenant, in: :query, type: :string

      security [{ bearer_auth: [] }]

      response '200', 'success' do
        let(:id) { @schedulers[2].id }
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Scheduler.scheduler
        run_test!
      end

      response '401', 'unauthorized' do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:id) { @schedulers[2].id }
        let(:Authorization) { 'Bearer wrongtoken' }
        schema SpecSchemas::Error.schema
        run_test!
      end
    end
    patch 'update scheduler' do
      tags SCHEDULERS_TAG
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          tenant: { type: :string }
        },
        required: %w[name tenant]
      }
      security [{ bearer_auth: [] }]
      expected_response_schema = SpecSchemas::Scheduler.scheduler
      response '200', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        let(:body) { { name: 'test name updated', tenant: @tenant.name } }
        let(:id) { @schedulers[0].id }
        let(:tenant) { @tenant.name }

        before do |example|
          submit_request(example.metadata)
        end

        schema expected_response_schema
        run_test!
      end
    end
    delete 'delete scheduler' do
      tags SCHEDULERS_TAG
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :tenant, in: :query, type: :string
      security [{ bearer_auth: [] }]
      response '200', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        let(:id) { @schedulers[1].id }
        let(:tenant) { @tenant.name }
        run_test!
      end
    end
  end
end
