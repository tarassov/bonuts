require 'swagger_helper'

PLUGINS_TAG = 'Plugins'.freeze
PLUGINS_PATH = '/plugins'.freeze

RSpec.describe('api/v1/plugins_controller', type: :request) do
  let(:count) { 10 }
  let(:test_tenant) { create(:tenant_with_profiles) }
  let(:plugins) { create_list(:plugin, count) }
  let(:test_plugin) { plugins[0] }
  let(:tenant_plugin) { create(:tenant_plugin, tenant: test_tenant, active: true, plugin: plugins[0]) }
  let(:admin) { create(:profile, admin: true, tenant: test_tenant) }
  let(:new_property) { create(:plugin_property, plugin: test_plugin) }

  let(:payload) do
    {
      tenant: test_tenant.name,
      plugin_settings: test_plugin.plugin_properties.map do |property|
        {
          id: property.id,
          value: Faker::Lorem.sentence
        }
      end
    }
  end

  before do
    test_tenant
    plugins
    tenant_plugin
    test_plugin
    admin
  end

  path PLUGINS_PATH do
    get 'get all plugins' do
      tags PLUGINS_TAG
      consumes 'application/json'
      produces 'application/json'
      parameter name: :tenant, in: :query, type: :string

      security [{ bearer_auth: [] }]

      response '200', 'success' do
        let(:tenant) { test_tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: admin.user.id)}" }
        schema type: :object,
               properties: {
                 data: {
                   type: :array,
                   items: { '$ref' => '#/components/schemas/TenantPlugin' }
                 }
               }

        run_test! do
          expect(response.parsed_body).to be_present
          expect(response.parsed_body['data'].length).to eq(count)
          expect(response.parsed_body['data'][0][:active]).to be_truthy
          expect(response.parsed_body['data'][0][:settings][0][:value]).to eq(tenant_plugin.plugin_settings[0][:value])
        end
      end

      response '401', 'unauthorized' do
        let(:tenant) { test_tenant.name }
        let(:Authorization) { 'Bearer wrongtoken' }
        schema SpecSchemas::Error.schema
        run_test!
      end
    end
  end

  path "#{PLUGINS_PATH}/{id}/activate" do
    post 'activate plugin' do
      tags PLUGINS_TAG
      security [{ bearer_auth: [] }]
      parameter name: :tenant, in: :query, type: :string
      parameter name: :id, in: :path, type: :string
      response '200', 'success' do
        let(:tenant) { test_tenant.name }
        let(:id) { plugins[1].id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: admin.user.id)}" }

        it 'create tenant plugin' do |example|
          expect do
            submit_request(example.metadata)
            assert_response_matches_metadata(example.metadata)
          end.to change(test_tenant.tenant_plugins, :count).by(1)

          new_plugin = test_tenant.tenant_plugins.last
          expect(new_plugin.active).to eq true
          expect(new_plugin.plugin.id).to eq plugins[1].id
        end

      end

    end
  end

  path "#{PLUGINS_PATH}/{id}" do
    before do
      new_property
      # add new property
      test_plugin.plugin_properties << new_property
      payload
    end

    patch 'set plugin properties' do
      tags PLUGINS_TAG
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'
      parameter name: :id, in: :path, type: :number
      parameter name: :payload, in: :body, schema: {
        type: :object,
        properties: {
          plugin_settings: {
            type: :array,
            items: {
              type: :object,
              properties: {
                id: { type: :number },
                value: { type: :string, nullable: true }
              },
              required: %w[name value]
            },
          },
          tenant: { type: :string },
        },
        required: %w[settings tenant]
      }
      response '200', 'success' do
        let(:id) { plugins[0].id }
        let(:Authorization) { "Bearer4 #{JsonWebToken.encode(user_id: admin.user.id)}" }

        it 'update plugin settings' do |example|
          expect do
            submit_request(example.metadata)
            assert_response_matches_metadata(example.metadata)
            tenant_plugin.reload
          end.to change { tenant_plugin.plugin_settings.map { |s| s.value } }.to(payload[:plugin_settings].map { |s| s[:value] })
        end
      end
    end
  end
end
