# frozen_string_literal: true

require 'swagger_helper'
RSpec.describe 'api/v1/donuts_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @donuts = create_list(:donut, 10, tenant: @tenant)
    @store_admin = create(:profile, tenant: @tenant, store_admin: true)
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
    post 'create new donut' do
      tags 'Donuts'
      consumes 'multipart/form-data'
      produces 'application/json'
      parameter name: :FormData, in: :formData, type: :object, required: true, schema:
        {
          "type": 'object',
          "required": %w[
            tenant
            logo
            name
            price
          ],
          "properties": {
            "price": { "type": 'number' },
            "name": { "type": 'string' },
            "tenant": { "type": 'string' },
            "logo": { "type": 'file' }
          }

        }
      parameter name: :price, in: :formData, type: :number, required: true
      parameter name: :name, in: :formData, type: :string, required: true
      parameter name: :tenant, in: :formData, type: :string, required: true
      parameter name: :logo, in: :formData, type: :file, required: true
      security [{ bearer_auth: [] }]
      expected_response_schema = SpecSchemas::Donut.response
      response '200', 'success' do
        let(:FormData) { { logo: FactoryBot.attributes_for(:image), id: 10, tenant: @tenant.name, price: 10, name: 'test' } }
        let(:price) { 10 }
        let(:name) { 'test' }
        let(:tenant) { @tenant.name }
        let(:logo) { FactoryBot.attributes_for(:image) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @store_admin.user.id)}" }

        before do |example|
          submit_request(example.metadata)
        end

        schema expected_response_schema
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
