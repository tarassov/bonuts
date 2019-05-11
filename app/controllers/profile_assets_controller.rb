class ProfileAssetsController < ApplicationController
  include Ability

  def create
    if check_tenant
      profile_id  = asset_params[:profile_id]
      donut_id = asset_params[:donut_id]
      create_profile_asset = CreateProfileAsset.call({profile_id: profile_id, donut_id: donut_id})
      if create_profile_asset.success?
        @asset = create_profile_asset.result
        json_response(ProfileAssetSerializer.new(@asset,{}).serialized_json, :created, @asset, :bad_request)
      end
    else
      render_error :forbiden, "Запрещено для этого пространства"        
    end
  end



  private
  def asset_params
    params.permit(:profile_id,:donut_id,:id, :enabled, :date_used)
  end


  def set_asset
      @asset = ProfileAsset.find(params[:id])
  end
end
