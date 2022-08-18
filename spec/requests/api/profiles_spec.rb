# frozen_string_literal: true

require 'swagger_helper'
# https://www.tealhq.com/post/how-teal-keeps-their-api-tests-and-documentation-in-sync

# https://github.com/parrish/json-schema_builder

# https://easy-json-schema.github.io/

RSpec.describe 'api/v1/profiles_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
  end
  path '/profile' do
    get 'get current profile' do
      tags 'Profiles'
      consumes 'application/json'
      parameter name: :tenant, in: :query, type: :string
      security [{ bearer_auth: [] }]

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Response.response_object( SpecSchemas::Profile.schema)
        run_test!
      end
    end 
  end
  path '/profiles' do
    get 'get all active tenant profiles' do
      tags 'Profiles'
      consumes 'application/json'
      parameter name: :tenant, in: :query, type: :string

      security [{ bearer_auth: [] }]

      response '200', 'success' do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Profile.response
        run_test!        
      end

      response '401', 'Unauthorized (' do
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
