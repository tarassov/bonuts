# frozen_string_literal: true

class Api::V1::RequestsController < Api::V1::ApiController
  before_action :set_asset, only: %i[activate show close rollback refund]
  include AbilityObsolete
  include FilterRequests

  def show
    if @current_profile.admin
      json_response(RequestSerializer.new(@asset, {}).serializable_hash.to_json, :ok, @asset, :not_found)
    elsif check_profile(@asset)
      json_response(RequestSerializer.new(@asset, {}).serializable_hash.to_json, :ok, @asset, :not_found)
    end
  end

  def create
    operation = Purchase.call({
                                profile: @current_profile,
                                donut_id: asset_params[:donut_id]
                              })

    response = operation.response
    if response.status != :ok
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
             status: response.status
    else
      json_response(RequestSerializer.new(response.result, {}).serializable_hash.to_json, :created,
                    response.result, :bad_request)
    end
  end

  def index
    requests = get_request_list(asset_params)
    json_response(RequestSerializer.new(requests, {}).serializable_hash.to_json, :ok)
  end

  def activate
    operation = ActivateRequest.call({ asset: @asset, profile: @current_profile })
    response = operation.response
    if response.status != :ok
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result },
             status: response.status
    else
      json_response(RequestSerializer.new(response.result, {}).serializable_hash.to_json, :ok, response.result,
                    :bad_request)
    end
  end

  def close
    logic_call  CloseRequest, asset_params.merge(asset: @asset, serializer_model_name: 'Request')
  end

  def rollback
    logic_call  RollbackRequest, asset_params.merge(asset: @asset, serializer_model_name: 'Request')
  end

  def refund
    logic_call  RefundRequest, asset_params.merge(asset: @asset, serializer_model_name: 'Request')
  end

  private

  def asset_params
    params.permit(:profile_id, :donut_id, :id, :enabled, :date_used, :status, :public_uid, :show_all, :archive, :active, :deleted,
                  :incoming, :my)
  end

  def set_asset
    if asset_params[:id]
      @asset = Request.find(asset_params[:id])
    elsif asset_params[:public_uid]
      @asset = Request.find_by(public_uid: asset_params[:public_uid])
    end
  end
end
