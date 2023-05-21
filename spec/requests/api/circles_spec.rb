require 'swagger_helper'

RSpec.describe 'api/v1/circles_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @donuts = create_list(:circle, 10, tenant: @tenant)
  end
  path '/circles' do
    get 'get all active circles' do
      tags 'Circles'
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
