require 'swagger_helper'

RSpec.describe 'api/v1/invitations_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @user = @tenant.profiles[0].user
    
    @admin_profile =  @tenant.profiles[1]
    @admin_profile.admin = true
    @admin_profile.save

  end
  path '/invitations' do
    post 'invite user' do
      tags 'Invitations'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          first_name: { type: :string },
          last_name: { type: :string },
          tenant: { type: :string },
        },
        required: %w[email first_name last_name]
      }

      expected_response_schema = SpecSchemas::Invitation.response

      response '201', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin_profile.user.id)}" }
        let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex', tenant: @tenant.name} }
        run_test!
      end

      response '400', 'bad_request' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user.id)}" }
        let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex'} }
        run_test!
      end

      response '401', 'not authorized' do
        let(:Authorization) { "Bearer wrongtoken" }
        let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex'} }
        run_test!
      end
    end
  end

end

