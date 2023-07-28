# frozen_string_literal: true

require 'json-schema'
require 'swagger_helper'

RSpec.describe 'api/v1/accounts_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @store_admin = create(:profile, tenant: @tenant, store_admin: true)
    @donut = create(:donut, tenant: @tenant)
    @profile = @tenant.profiles[0]
    DepositAction.call({ account: @profile.self_account, amount: 100_000 })
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
  path '/accounts/{id}' do
    get 'get account balance info' do
      tags 'Accounts'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :number, required: true
      parameter name: :tenant, in: :query, type: :string, required: true
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Account.object

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:id) { @tenant.profiles[0].self_account.id }
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
end
# frozen_string_literal: true
