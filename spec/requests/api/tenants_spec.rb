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
      tags 'Tenant'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string

      response '200', 'success' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        let(:tenant) { @tenant.name }

        schema SpecSchemas::Tenant.response
        run_test!
      end

      response '401', 'forbidden' do
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user2.id)}" }
        let(:tenant) { @tenant.name }
        run_test!
      end
    end

    put 'update tenant info' do
      tags 'Tenant'
      consumes 'multipart/form-data'
      produces 'application/json'

      parameter name: :FormData, in: :formData, type: :object, required: true, schema: SpecSchemas::Tenant.update_schema

      parameter name: :name, in: :formData, type: :string, required: true
      parameter name: :domain, in: :formData, type: :string, required: true
      parameter name: :tenant, in: :formData, type: :string, required: true
      parameter name: :welcome_donuts, in: :formData, type: :number, required: true
      parameter name: :welcome_points, in: :formData, type: :number, required: true
      parameter name: :join_to_project_donuts, in: :formData, type: :number, required: true
      parameter name: :join_to_project_points, in: :formData, type: :number, required: true
      parameter name: :join_to_company_donuts, in: :formData, type: :number, required: true
      parameter name: :join_to_company_points, in: :formData, type: :number, required: true
      parameter name: :email_notification, in: :formData, type: :boolean, required: true
      parameter name: :use_departments, in: :formData, type: :boolean, required: false
      parameter name: :logo, in: :formData, type: :file, required: true

      security [{ bearer_auth: [] }]
      expected_response_schema = SpecSchemas::Tenant.response
      response '200', 'success' do
        let(:FormData) {}
        let(:welcome_donuts) { 100 }
        let(:welcome_points) { 100 }
        let(:join_to_project_donuts) { 100 }
        let(:join_to_project_points) { 100 }
        let(:join_to_company_donuts) { 100 }
        let(:join_to_company_points) { 100 }
        let(:email_notification) { true }
        let(:use_departments) { 100 }
        let(:name) { 'test2222' }
        let(:domain) { 'test.ru' }
        let(:tenant) { @tenant.name }
        let(:logo) { FactoryBot.attributes_for(:image) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }

        schema expected_response_schema

        run_test!
      end
    end
  end
end
