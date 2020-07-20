# frozen_string_literal: true

class ProfileAssetsController < ApiController
  before_action :set_asset, only: [:update,:activate, :show]
  include Ability


  def show
    if @current_profile.admin
      json_response(ProfileAssetSerializer.new(@asset, {}).serialized_json, :ok, @asset, :not_found)
    elsif check_profile(@asset) 
      json_response(ProfileAssetSerializer.new(@asset, {}).serialized_json, :ok, @asset, :not_found)
    end  
  end

  def create
    operation = Purchase.call({
      profile: @current_profile,
      donut_id: asset_params[:donut_id]
    })

    response = operation.response
    if (response.status != :ok)
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result }, status: response.status   
    else
      json_response(ProfileAssetSerializer.new(response.result, {}).serialized_json, :created, response.result, :bad_request)
    end  

    # donut_id = asset_params[:donut_id]
    # donut = Donut.find(donut_id)
    # if check_tenant(donut)
    #   profile_id = asset_params.fetch(:profile_id, @current_profile.id)
    #   create_profile_asset = CreateProfileAsset.call({ profile_id: profile_id, donut_id: donut_id })
    #   if create_profile_asset.success?
    #     asset = create_profile_asset.result
    #     json_response(ProfileAssetSerializer.new(asset, {}).serialized_json, :created, asset, :bad_request)
    #   else
    #     render_error :forbidden, create_profile_asset.errors[:error].first
    #   end
    # else
    #   render_error :forbidden, 'Запрещено для этого пространства'
    # end
  end

  def index
    profile_id = asset_params.fetch(:profile_id, @current_profile.id)
    if check_profile(profile_id)
      profile_assets = ProfileAsset.by_profile(profile_id)
      json_response(ProfileAssetSerializer.new(profile_assets, {}).serialized_json, :ok)
    end  
  end

  def requests
    archive = asset_params.fetch(:archive, false)
    if check_store_admin
      profile_assets = ProfileAsset.joins(:profile).where(profiles: {tenant:current_tenant}, status: 0)
      profile_assets =profile_assets.or(ProfileAsset.joins(:profile).where(profiles: {tenant:current_tenant}, status: 1))
      if archive
        profile_assets = profile_assets.or(ProfileAsset.joins(:profile).where(profiles: {tenant:current_tenant}, status: 2))         
      end  
      json_response(RequestSerializer.new(profile_assets, {}).serialized_json, :ok)
    end  
  end

  def activate
    operation = ActivateRegard.call({asset: @asset, profile: @current_profile})
    response = operation.response
    if (response.status != :ok)
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result }, status: response.status   
    else
      json_response(RequestSerializer.new(response.result, {}).serialized_json, :ok, response.result, :bad_request)
    end  
  end

  private

  def asset_params
    params.permit(:profile_id, :donut_id, :id, :enabled, :date_used, :status, :public_uid, :show_all, :archive)
  end

  def set_asset
    if asset_params[:id]
      @asset = ProfileAsset.find(asset_params[:id])
    else
      if asset_params[:public_uid]
        @asset = ProfileAsset.find_by_public_uid(asset_params[:public_uid])
      end
    end
  end
end
