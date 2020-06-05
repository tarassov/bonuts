# frozen_string_literal: true

class ProfileAssetsController < ApiController
  before_action :set_asset, only: [:update]
  include Ability

  def create
    donut_id = asset_params[:donut_id]
    donut = Donut.find(donut_id)
    if check_tenant(donut)
      profile_id = asset_params.fetch(:profile_id, @current_profile.id)
      create_profile_asset = CreateProfileAsset.call({ profile_id: profile_id, donut_id: donut_id })
      if create_profile_asset.success?
        asset = create_profile_asset.result
        json_response(ProfileAssetSerializer.new(asset, {}).serialized_json, :created, asset, :bad_request)
      else
        render_error :forbiden, create_profile_asset.errors[:error].first
      end
    else
      render_error :forbiden, 'Запрещено для этого пространства'
    end
  end

  def index
    profile_id = asset_params.fetch(:profile_id, @current_profile.id)
    if check_profile(profile_id)
      profile_assets = ProfileAsset.by_profile(profile_id)
      json_response(ProfileAssetSerializer.new(profile_assets, {}).serialized_json, :ok)
    end
  end

  def update
    if @asset
      if check_admin || check_profile(@asset.profile_id)
        @asset.status = 1 if @asset.status == 0 && asset_params[:status] == 1

        if @asset.status == 2 && asset_params[:status] == 2
          render_error :not_changed, 'Already activated'
          return
        end

        if @asset.status != 2 && asset_params[:status] == 2 && check_admin
          @asset.status = 2
          @asset.date_used = DateTime.current
        end

        @asset.save
        json_response(ProfileAssetSerializer.new(@asset, {}).serialized_json, :ok)
      else
        render_error :forbiden, 'Недостаточно полномочий'
      end
    else
      render_error :not_found, 'Regard not found'
    end
  end

  private

  def asset_params
    params.permit(:profile_id, :donut_id, :id, :enabled, :date_used, :status, :public_uid)
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
