# frozen_string_literal: true

require 'swagger_helper'
RSpec.describe 'api/v1/donuts_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @donuts = create_list(:donut, 10, tenant: @tenant)
  end
  path '/donuts' do
    get 'get all active donuts' do
      tags 'Donuts'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string
      parameter name: :all, in: :query, type: :string, required: false

      security [{ bearer_auth: [] }]

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:all) { 'false' }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Donut.response
        run_test!
      end

      response '401', 'unauthorized' do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:all) { 'false' }
        let(:Authorization) { 'Bearer wrongtoken' }
        schema SpecSchemas::Error.schema
        run_test!
      end
    end
  end
  path '/donuts/{id}' do
    get 'get donut' do
      tags 'Donuts'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string
      parameter name: :tenant, in: :query, type: :string

      security [{ bearer_auth: [] }]

      response '200', 'sends donut' do
        let(:id) { @donuts[0].id }
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Response.response_object(SpecSchemas::Donut.schema)
        run_test!
      end
    end
  end
end
