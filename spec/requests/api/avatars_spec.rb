require 'swagger_helper'

RSpec.describe 'api/v1/avatars_controller', type: :request do
  post 'update avatar' do
    tags 'Users'
    consumes 'multipart/form-data'
    produces 'application/json'
    security [{ bearer_auth: [] }]

    expected_response_schema = SpecSchemas::Profile.schema_current_profile

    response '200', 'success' do
      schema expected_response_schema
      expected_response_schema = SpecSchemas::Profile.schema_current_profile

      it 'matches the documented response schema' do |_example|
        @tenant = create(:tenant_with_profiles)
        @user1 = @tenant.profiles[2].user
        @user1.confirm_token = 'my_confirm_token'
        @user1.save

        image_params = FactoryBot.attributes_for(:image)
        post '/api/v1/avatars', params: { uploaded_image: image_params, id: @user1.id, tenant: @tenant.name },
                                headers: { 'Authorization' => "Bearer #{JsonWebToken.encode(user_id: @user1.id)}" },
                                as: :multipart_form
        json_response = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
      end
    end
  end
end
