require 'swagger_helper'

RSpec.describe 'api/v1/users_controller', type: :request do
    path '/register' do

        post 'Register user' do 
          tags 'Users'
          consumes 'application/json'
          parameter name: :user, in: :body, schema: {
            type: :object,
            properties: {
              email: { type: :string },
              first_name: { type: :string },
              last_name: { type: :string },
              password: { type: :string },
              tenant: {type: :string}
            },
            required: [ 'email', 'password', 'first_name','last_name','tenant']
          }
    
          response '201', 'success' do
            let(:user) { { email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex', password: '123456', tenant: 'demo' } }
            run_test!
          end
    
          response '402', 'bad request' do
            let(:user) { {  email: 'mail@mail.com', first_name: 'Alex', last_name: 'Alex', password: '123456' } }
            run_test!
          end
        end
      end
end
