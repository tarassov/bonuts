require 'swagger_helper'

PLUGINS_TAG = 'Plugins'.freeze
PLUGINS_PATH = '/plugins'.freeze

RSpec.describe 'api/v1/plugins_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @plugin = create_list(:plugin, 10, tenant: @tenant)
    @admin = create(:profile, tenant: @tenant, admin: true)
  end
  path PLUGINS_PATH do
    get 'get all active circles' do
      tags PLUGINS_TAG
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
  end

end


