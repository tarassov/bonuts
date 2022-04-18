require 'swagger_helper'

RSpec.describe 'api/v1/tenants_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @user = create(:user)
    @user.email = 'pupkin55@testmail.com'
    @user.save
    @profile = Profile.new({user: @user})

    @user2 = create(:user)
    @user2.email = 'pupkin55@wrongmail.com'
    @user2.save
    @profile2 = Profile.new({user: @user2})

    @tenant.domain = 'testmail.com'
    @tenant.save 
  end

  path '/tenants/{tenant_name}/join' do
    post 'join tenant' do
      tags 'Tenants'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      parameter name: :tenant_name, in: :path, type: :string

      response '200', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user.id)}" }  
        let(:tenant_name) {@tenant.name}   
        run_test!
      end

      response '403', 'forbidden' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user2.id)}" }
        let(:tenant_name)  {@tenant.name}     
        run_test!
      end
    end
  end
  
  

end

