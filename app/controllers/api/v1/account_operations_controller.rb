# frozen_string_literal: true

module Api
  module V1
    class AccountOperationsController < Api::V1::ApiController
      def show
        operation = AccountOperation.find(operation_params[:id])
        if check_profile(operation.account.profile || check_admin)
          json_response(AccountOperationSerializer.new(
            operations,
            {
              params: {
                include: [:profile],
                current_profile: @current_profile,
              },
            },
          ).serializable_hash.to_json)
        end
      end

      def index
        account = Account.find(operation_params[:account_id])
        if check_profile(account.profile_id)
          all_operation = AccountOperation.where(account_id: account.id).order(created_at: :desc)

          operations = paginate(all_operation
            .order(created_at: :desc))

          response.headers["request_date"] = Time.zone.now
          json_response(AccountOperationSerializer.new(
            operations,
            {
              params: {
                include: [:profile],
                current_profile: @current_profile,
              },
            },
          ).serializable_hash.to_json)
        end
      end

      def admin_deposit
        operation = AdminDeposit.call({
          tenant: @current_tenant,
          profile: @current_profile,
          amount: operation_params[:amount].to_i,
          comment: operation_params[:comment],
          to_profile_ids: operation_params[:to_profile_ids],
          account_type: operation_params.fetch(:account_type, "distrib"),

        })

        response = operation.response
        render(
          json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
          status: response.status,
        )
      end

      def create
        share_for_all = operation_params.fetch(:share_for_all, false)
        operation = if share_for_all
          ShareAll.call({
            tenant: @current_tenant,
            profile: @current_profile,
            amount: operation_params[:amount].to_i,
            comment: operation_params[:comment],
            burn_old: operation_params.fetch(:burn_old, false),
            to_self_account: operation_params.fetch(:to_self_account, false),
          })
        else
          Transfer.call({
            tenant: @current_tenant,
            profile: @current_profile,
            amount: operation_params[:amount].to_i,
            comment: operation_params[:comment],
            to_profile_ids: operation_params[:to_profile_ids],
          })
        end
        response = operation.response
        render(
          json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
          status: response.status,
        )
      end

      private

      def operation_params
        params.permit(
          :id,
          :account_id,
          :amount,
          :from_profile_id,
          :comment,
          :is_for_distrib,
          :share_for_all,
          :burn_old,
          :to_self_account,
          :tenant,
          :account_type,
          to_profile_ids: [],
        )
      end
    end
  end
end
