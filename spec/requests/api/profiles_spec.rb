require 'swagger_helper'
#https://www.tealhq.com/post/how-teal-keeps-their-api-tests-and-documentation-in-sync

RSpec.describe 'api/v1/profiles_controller', type: :request do
    before(:context) do
        @tenant = create(:tenant_with_profiles)       
    end
    path '/profiles' do

        get 'get all active tenant profiles' do 
          tags 'Profiles'
          consumes 'application/json'
          parameter name: :tenant, in: :query, type: :string
          
          security [{ bearer_auth: [] }]
          expected_response_schema = {
            type: :object,
            properties: {
              id: { type: :integer }, 
              email: { type: :string }, 
              active: { type: :boolean },
              admin: { type: :boolean }
            },
            required: [ 'id', 'email', 'active','admin' ]
          }
    
    
          response '201', 'success' do
              let(:tenant) {@tenant.name}
             # let(:token) JsonWebToken.encode(tenant.profiles[0].user.id)
              let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
           
              before do |example|
                submit_request(example.metadata)
              end
      
              schema expected_response_schema
      
        
              it "matches the documented response schema" do  |example|
                json_response = JSON.parse(response.body)
                JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
              end
      
              it 'returns a valid 201 response' do |example|
                expect(response.status).to eq(201)
              end
          end
    
          response '400', 'bad request' do
            let(:tenant) {create(:tenant_with_profiles).name}
            run_test!
          end
        end
      end
end
