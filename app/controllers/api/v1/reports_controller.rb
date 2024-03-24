# frozen_string_literal: true

module Api
  module V1
    class ReportsController < Api::V1::ApiController
      def profiles
        if check_admin
          query = report_query(ProfilesReport, reports_params)
          # json_response(query.explain)
          json_response(ProfileSerializer.new(query, {
            params: {
              bot: false,
              show_score: true,
            },
          }).serializable_hash.to_json)
        end
      end

      private

      def reports_params
        params.permit(
          :tenant,
          :search_text,
          :date_from,
          :report_type,
          :date_to,
        )
      end
    end
  end
end
