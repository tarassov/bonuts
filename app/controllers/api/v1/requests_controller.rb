# frozen_string_literal: true

class Api::V1::RequestsController < Api::V1::ApiController
  before_action :set_asset, only: %i[update activate show close rollback refund]
  include AbilityObsolete

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
    profile_id = asset_params.fetch(:profile_id, @current_profile.id)
    if check_profile(profile_id)
      requests = Request.by_profile(profile_id).where(deleted:  [false, nil])
      json_response(RequestSerializer.new(requests, {}).serializable_hash.to_json, :ok)
    end
  end

  def index
    archive = asset_params.fetch(:archive, false)
    active = asset_params.fetch(:active, false)
    deleted = asset_params.fetch(:deleted, false)

    if check_store_admin
      requests = Request.joins(:profile).where(profiles: { tenant: current_tenant }, status: 0, deleted: [deleted, nil])
    else
      requests = Request.joins(:profile).where(profile: current_porfile, profiles: { tenant: current_tenant }, status: 0, deleted: [deleted, nil])
    end    

    requests = requests.or(Request.joins(:profile).where(profiles: { tenant: current_tenant },
                                                                          status: nil))
    if active
      requests = requests.or(Request.joins(:profile).where(profiles: { tenant: current_tenant },
                                                                            status:1 ))
    end
    if archive
      requests = requests.or(Request.joins(:profile).where(profiles: { tenant: current_tenant },
                                                                            status: 2))
    end
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
  
  def  close
    logic_call  CloseRequest, asset_params.merge(asset: @asset,serializer_model_name: "Request")
  end
  def  rollback
    logic_call  RollbackRequest, asset_params.merge(asset: @asset,serializer_model_name: "Request")
  end

  def refund
    logic_call  RefundRequest, asset_params.merge(asset: @asset,serializer_model_name: "Request")
  end

  private

  def asset_params
    params.permit(:profile_id, :donut_id, :id, :enabled, :date_used, :status, :public_uid, :show_all, :archive, :active, :deleted)
  end

  def set_asset
    if asset_params[:id]
      @asset = Request.find(asset_params[:id])
    elsif asset_params[:public_uid]
      @asset = Request.find_by_public_uid(asset_params[:public_uid])
    end
  end
end
