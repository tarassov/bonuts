require 'swagger_helper'

RSpec.describe 'api/v1/users_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @user1 = @tenant.profiles[2].user
    @user1.confirm_token = 'my_confirm_token'
    @user1.save

    @user2 = @tenant.profiles[3].user
    @user2.password = '123'
    @user2.save

    @user3 = @tenant.profiles[4].user
    @user3.password = '123'
    @user3.email_confirmed = true
    @user3.save
  end
  path '/register' do
    post 'register user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          first_name: { type: :string },
          last_name: { type: :string },
          password: { type: :string }
        },
        required: %w[email password first_name last_name]
      }

      expected_response_schema = SpecSchemas::User.response

      response '201', 'success' do
        let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex', password: '123456' } }
        run_test!
      end

      response '400', 'bad request' do
        let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex' } }
        run_test!
      end
    end
  end

  path '/confirm_email' do
    post 'confirm email' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          token: { type: :string }
        },
        required: ['token']
      }

      response '201', 'success' do
        let(:user) { { token: 'my_confirm_token' } }
        run_test!
      end

      response '400', 'not found' do
        let(:user) { { token: 'wrong_confirm_token' } }
        run_test!
      end
    end
  end

  path '/authenticate' do
    post 'authenticate' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :credentials, in: :body, schema: {
        type: :object,
        properties: {
          email: { type: :string },
          password: { type: :string }
        },
        required: %w[email password]
      }

      expected_response_schema = SpecSchemas::Token.response

      response '200', 'success' do
        let(:credentials) { { email: @user3.email, password: '123' } }
        before do |example|
          submit_request(example.metadata)
        end

        schema expected_response_schema

        it 'matches the documented response schema' do |_example|
          json_response = JSON.parse(response.body)
          JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
        end

        it 'returns a valid 200 response' do |_example|
          expect(response.status).to eq(200)
        end
      end

      response '403', 'not confirmed email' do
        let(:credentials) { { email: @user2.email, password: '123' } }
        run_test!
      end

      response '403', 'invalid credentials' do
        let(:credentials) { { email: @user2.email, password: '456' } }
        run_test!
      end
    end
  end
end
