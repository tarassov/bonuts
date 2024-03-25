# frozen_string_literal: true

require "swagger_helper"
# https://www.tealhq.com/post/how-teal-keeps-their-api-tests-and-documentation-in-sync

# https://github.com/parrish/json-schema_builder

# https://easy-json-schema.github.io/

RSpec.describe("api/v1/reports_controller", type: :request) do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @admin = create(:profile, tenant: @tenant, admin: true)
  end
  path "/reports/profiles" do
    get "return statistics for active profiles" do
      tags "Reports"
      consumes "application/json"
      produces "application/json"
      parameter name: :tenant, in: :query, type: :string
      parameter name: :report_type,
        in: :query,
        description: "Value that will be displayed as reported  in score_total field",
        schema: {
          type: :string,
          enum: [ReportTypes::SHOW_BALANCE, ReportTypes::SHOW_SCORE, ReportTypes::SHOW_SENT],
        },
        required: false
      parameter name: :date_from, in: :query, type: :string, required: false
      parameter name: :date_to, in: :query, type: :string, required: false, description: "Search string"
      parameter name: :search_text, in: :query, type: :string, required: false

      security [{ bearer_auth: [] }]

      expected_response_schema = SpecSchemas::Profile.array_response

      response "200", "success" do
        let(:tenant) { @tenant.name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin.user.id)}" }
        schema expected_response_schema
        run_test!
      end

      response "403", "Authorities check" do
        let(:tenant) { create(:tenant_with_profiles).name }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @tenant.profiles[0].user.id)}" }

        before do |example|
          submit_request(example.metadata)
        end

        it "returns a valid 401 response" do |_example|
          expect(response.status).to(eq(401))
        end
      end

      response "401", "Unauthorized" do
        let(:tenant) { create(:tenant_with_profiles).name }
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
