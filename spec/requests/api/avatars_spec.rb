require 'swagger_helper'

RSpec.describe 'api/v1/avatars_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @user1 = @tenant.profiles[2].user
    @user1.confirm_token = 'my_confirm_token'
    @user1.save
  end
  path '/avatars' do
    post 'update avatar' do
      tags 'Users'
      consumes 'multipart/form-data'
      produces 'application/json'
      parameter name: :FormData, in: :formData, type: :object, required: true, schema:
        {
          "type": 'object',
          "required": %w[
            id
            tenant
            uploaded_image
          ],
          "properties": {
            "id": { "type": 'number' },
            "tenant": { "type": 'string' },
            "uploaded_image": { "type": 'file' }
          }

        }
      parameter name: :id, in: :formData, type: :number, required: true
      parameter name: :tenant, in: :formData, type: :string, required: true
      parameter name: :uploaded_image, in: :formData, type: :file, required: true
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Profile.profile

      response '200', 'success' do
        let(:FormData) { { uploaded_image: FactoryBot.attributes_for(:image), id: @user1.id, tenant: @tenant.name } }
        let(:id) { @user1.id }
        let(:tenant) { @tenant.name }
        let(:uploaded_image) { FactoryBot.attributes_for(:image) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user1.id)}" }

        before do |example|
          submit_request(example.metadata)
        end

        schema expected_response_schema
        run_test!
      end
    end
  end
end
