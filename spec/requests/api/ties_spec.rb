# frozen_string_literal: true

require 'json-schema'
require 'swagger_helper'


RSpec.describe 'api/v1/ties_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @store_admin = create(:profile, tenant: @tenant, store_admin: true)
    @donut = create(:donut, tenant: @tenant)
    @admin = create(:profile, tenant: @tenant, admin: true)
    DepositAction.call({ account: @admin.distrib_account, amount: 100_000 })
    TransferAction.call({to_profile_ids: [ @tenant.profiles[1].id], profile: @admin, amount: 10})
  end
  path '/ties' do
    get 'get tenant ties' do
      tags 'Ties'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string
      parameter name: :date_from, in: :query, type: :string, required: false
      parameter name: :date_to, in: :query, type: :string, required: false
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Ties.schema

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
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
