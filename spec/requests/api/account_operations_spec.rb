# frozen_string_literal: true

require "swagger_helper"

RSpec.describe("api/v1/account_operations_controller", type: :request) do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profile1 = @tenant.profiles[2]
    @profile2 = @tenant.profiles[3]
    acc = AccountOperation.create({
      amount: 100,
      account: @profile1.distrib_account,
      direction: 1,
      deal: Deal.new,
    })
    acc.save
  end
  path "/account_operations" do
    post "send points" do
      tags "Account operations"
      consumes "application/json"
      produces "application/json"
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          tenant: { type: :string },
          amount: { type: :number },
          from_profile_id: { type: :number },
          to_profile_ids: { type: :array, items: { type: :number } },
          comment: { type: :string },
          share_for_all: { type: :boolean },
          is_for_distrib: { type: :boolean },
          burn_old: { type: :boolean },
          to_self_account: { type: :boolean },
        },
        required: ["amount", "to_profile_ids", "comment", "tenant"],
      }
      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Response.array_response(SpecSchemas::AccountOperation.schema)

      response "201", "success" do
        let(:body) do
          {
            amount: 10,
            tenant: @tenant.name,
            to_profile_ids: [@profile2.id],
            comment: "test comment",
          }
        end
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @profile1.user.id)}" }
        schema expected_response_schema
        run_test!
      end

      response "400", "bad request" do
        let(:body) do
          {
            amount: 1000,
            tenant: @tenant.name,
            to_profile_ids: [@profile2.id],
            comment: "test comment",
          }
        end
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @profile1.user.id)}" }
        run_test!
      end
    end
    get "get operations list" do
      tags "Account operations"
      consumes "application/json"
      produces "application/json"
      parameter name: :tenant, in: :query, type: :string
      parameter name: :account_id, in: :query, type: :string
      parameter name: :page, in: :query, type: :number

      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Response.array_response(SpecSchemas::AccountOperation.schema)

      response "200", "success" do
        let(:tenant) { @tenant.name }
        let(:account_id) { @profile1.distrib_account.id }
        let(:page) { 1 }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @profile1.user.id)}" }

        before do |example|
          submit_request(example.metadata)
        end

        schema expected_response_schema
        it "matches the documented response schema" do |_example|
          json_response = JSON.parse(response.body)
          JSON::Validator.validate!(expected_response_schema, json_response, strict: false)
        end

        it "returns a valid 200 response" do |_example|
          expect(response.status).to(eq(200))
        end
      end

      response "401", "unauthorized" do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:account_id) { @profile1.distrib_account.id }
        let(:page) { 1 }
        let(:Authorization) { "Bearer wrongtoken" }

        before do |example|
          submit_request(example.metadata)
        end

        it "returns a valid 401 response" do |_example|
          expect(response.status).to(eq(401))
        end
      end
    end
  end
end
