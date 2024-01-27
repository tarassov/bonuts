# frozen_string_literal: true

module Api
  module V1
    class AccountsController < Api::V1::ApiController
      before_action :set_account, only: %i[show]

      def show
        if @account
          if @account.tenant_id != current_tenant&.id || @account.profile_id != current_profile.id
            render_error(:forbidden, 'access denied')
          else
            json_response(
              AccountSerializer.new(@account,
                                    { params: { current_profile: @current_profile } }).serializable_hash.to_json, :ok
            )
          end
        else
          render_error(:not_found, 'account not found')
        end
      end

      private

      def permit_params
        params.permit(:id, :tenant)
      end

      def set_account
        @account = Account.where({ id: permit_params[:id], tenant: current_tenant&.id }).first
      end
    end
  end
end
