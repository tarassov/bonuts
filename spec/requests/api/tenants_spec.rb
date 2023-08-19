# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'api/v1/tenants_controller', type: :request do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @user = create(:user)
    @user.email = Faker::Internet.email(name: Faker::IDNumber.brazilian_citizen_number, domain: 'testmail.com')
    @user.save
    # @profile = Profile.new({ user: @user })

    @user2 = create(:user)
    @user2.email = Faker::Internet.email(domain: 'wrongmail.com')
    @user2.save
    @profile2 = Profile.new({ user: @user2 })

    @tenant.domain = 'testmail.com'
    @tenant.save

    @admin = create(:profile, tenant: @tenant, admin: true)
    @admin.save
  end

  path '/tenants/{tenant_name}/join' do
    post 'join tenant' do
      tags 'Tenants'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      parameter name: :tenant_name, in: :path, type: :string

      response '200', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user.id)}" }
        let(:tenant_name) { @tenant.name }
        run_test!
      end

      response '403', 'forbidden' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user2.id)}" }
        let(:tenant_name) { @tenant.name }
        run_test!
      end
    end
  end
  path '/tenant/current' do
    get 'get current tenant info' do
      tags 'Tenants'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string

      response '200', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        let(:tenant) { @tenant.name }

        before do |example|
          submit_request(example.metadata)
        end

        schema SpecSchemas::Tenant.response
        run_test!
      end

      response '401', 'forbidden' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user2.id)}" }
        let(:tenant) { @tenant.name }
        run_test!
      end
    end
  end
end
