# frozen_string_literal: true

require "json-schema"
require "swagger_helper"

RSpec.describe("api/v1/plugins_controller", type: :request) do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    plugin = Plugin.create({ name: "Plugin" })
    property = PluginProperty.create({ name: "propery", plugin: plugin })
    tenant_plugin = TenantPlugin.create!(tenant: @tenant, plugin: plugin, active: true)
    PluginSetting.create!(
      tenant: @tenant,
      plugin: plugin,
      tenant_plugin: tenant_plugin,
      plugin_property: property,
    )
    @admin = create(:profile, tenant: @tenant, admin: true)
  end
  path "/tenant_plugins" do
    get "get plugins" do
      tags "Tenant plugins"
      consumes "application/json"
      produces "application/json"
      parameter name: :tenant, in: :query, type: :string
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Plugin.array

      response "200", "success" do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        schema expected_response_schema

        before do |example|
          submit_request(example.metadata)
        end

        it "matches the documented response schema" do |_example|
          json_response = JSON.parse(response.body)
          # puts json_response
          JSON::Validator.validate!(expected_response_schema, json_response, strict: true)
        end

        it "returns a valid 200 response" do |_example|
          expect(response.status).to(eq(200))
        end
      end
      response "401", "unauthorized" do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer wrongtoken" }
        schema SpecSchemas::Error.schema
        run_test!
      end
      response "403", "forbidden" do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }
        schema SpecSchemas::Error.schema
        run_test!
      end
    end
  end
end
# frozen_string_literal: true
