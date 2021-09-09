# frozen_string_literal: true

class Api::V1::AccountOperationsController < Api::V1::ApiController
  def show
    operation = AccountOperation.find(operation_params[:id])
    if check_profile operation.account.profile || check_admin
      json_response AccountOperationSerializer.new(operations,
                                                   { params: { include: [:profile],
                                                               current_profile: @current_profile } }).serializable_hash.to_json
    end
  end

  def index
    account = Account.find(operation_params[:account_id])
    if check_profile account.profile_id
      allOperation = AccountOperation.where(account_id: account.id).order(created_at: :desc)

      operations = paginate allOperation
                   .order(created_at: :desc)

      response.headers['request_date'] = DateTime.now
      json_response AccountOperationSerializer.new(operations,
                                                   { params: { include: [:profile],
                                                               current_profile: @current_profile } }).serializable_hash.to_json
    end
  end

  def admin_deposit
    amount = operation_params[:amount].to_i
    users = operation_params[:to_profile_ids]
    comment = operation_params[:comment]
    tenant_id = current_tenant.id
    operation = AdminDeposit.call({
                                    tenant: @current_tenant,
                                    profile: @current_profile,
                                    amount: operation_params[:amount].to_i,
                                    comment: operation_params[:comment],
                                    to_profile_ids: operation_params[:to_profile_ids],
                                    to_self_account: operation_params.fetch(:to_self_account, false)
                                  })

    response = operation.response
    render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
           status: response.status
  end

  def create
    from_id = operation_params[:from_profile_id]
    amount = operation_params[:amount].to_i
    users = operation_params[:to_profile_ids]
    comment = operation_params[:comment]
    tenant_id = current_tenant.id
    is_for_distrib = operation_params.fetch(:is_for_distrib, false)
    share_for_all = operation_params.fetch(:share_for_all, false)
    burn_old = operation_params.fetch(:burn_old, false)
    operation = if share_for_all
                  ShareAll.call({
                                  tenant: @current_tenant,
                                  profile: @current_profile,
                                  amount: operation_params[:amount].to_i,
                                  comment: operation_params[:comment],
                                  burn_old: operation_params.fetch(:burn_old, false),
                                  to_self_account: operation_params.fetch(:to_self_account, false)
                                })
                else
                  Transfer.call({
                                  tenant: @current_tenant,
                                  profile: @current_profile,
                                  amount: operation_params[:amount].to_i,
                                  comment: operation_params[:comment],
                                  to_profile_ids: operation_params[:to_profile_ids]
                                })
                end
    response = operation.response
    render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
           status: response.status
  end

  private

  def operation_params
    params.permit(:id, :account_id, :amount, :from_profile_id, :comment, :is_for_distrib, :share_for_all, :burn_old,
                  :to_self_account, to_profile_ids: [])
  end
end
