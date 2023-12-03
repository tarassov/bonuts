# frozen_string_literal: true

require 'json-schema'
require 'swagger_helper'

def request_operation_spec(active)
  tags 'Requests'
  consumes 'application/json'
  produces 'application/json'
  parameter name: :body, in: :body, schema: {
    type: :object,
    properties: {
      id: { type: :number },
      tenant: { type: :string }
    }
  }
  security [{ bearer_auth: [] }]
  expected_response_schema = SpecSchemas::Request.array

  response '200', 'success' do
    let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @store_admin.user.id)}" }
    let(:body) do
      { id: active ? @activated_request.id : @request.id, tenant: @tenant.name }
    end

    schema expected_response_schema

    run_test!
  end
  response '403', 'not authorized' do
    let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @store_admin.user.id)}" }
    let(:body) do
      { id: active ? @activated_request.id : @request.id }
    end

    schema expected_response_schema

    run_test!
  end
end

RSpec.describe 'api/v1/requests_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @store_admin = create(:profile, tenant: @tenant, store_admin: true)
    @donut = create(:donut, tenant: @tenant)
    @profile = @tenant.profiles[0]
    DepositAction.call({ account: @profile.self_account, amount: 100_000 })
    # @request = Request.create!({ profile: @profile, donut: @donut, status: 0 })
    operation = Purchase.call({
                                profile: @profile,
                                donut_id: @donut.id
                              })
    response = operation.response
    @request = response.result.first

    operation2 = Purchase.call({
                                 profile: @profile,
                                 donut_id: @donut.id
                               })
    response2 = operation2.response
    @activated_request = response2.result.first
    ActivateRequest.call({ asset: @activated_request, profile: @store_admin })

    @donut2 = create(:donut, tenant: @tenant)
    @donut3 = create(:donut, tenant: @tenant)
    @request2 = Request.create!({ profile: @profile, donut: @donut2, status: 0 })
  end
  path '/requests' do
    get 'get current requests' do
      tags 'Requests'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :active, in: :query, type: :boolean, required: false
      parameter name: :archive, in: :query, type: :boolean, required: false
      parameter name: :incoming, in: :query, type: :boolean, required: false
      parameter name: :my, in: :query, type: :boolean, required: false
      parameter name: :tenant, in: :query, type: :string
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Request.array

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema expected_response_schema

        before do |example|
          submit_request(example.metadata)
        end

        it 'matches the documented response schema' do |_example|
          json_response = JSON.parse(response.body)
          # puts json_response
          JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
        end

        it 'returns a valid 200 response' do |_example|
          expect(response.status).to eq(200)
        end
      end
    end
  end
  path '/requests/activate' do
    post 'activate  request' do
      request_operation_spec(false)
    end
  end
  path '/requests/refund' do
    post 'refund  request' do
      request_operation_spec(false)
    end
  end
  path '/requests/rollback' do
    post 'rollback request' do
      request_operation_spec(true)
    end
  end
  path '/requests/close' do
    post 'close request' do
      request_operation_spec(true)
    end
  end
  path '/requests' do
    post 'create new request' do
      tags 'Requests'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          donut_id: { type: :number },
          tenant: { type: :string }
        }
        # required: %w[email first_name last_name position admin tenant]
      }
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Request.array

      response '201', 'success' do
        let(:id) { @tenant.profiles[0].user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        let(:body) do
          { donut_id: @donut3.id, tenant: @tenant.name }
        end

        schema expected_response_schema

        run_test!
      end
    end
  end
end
