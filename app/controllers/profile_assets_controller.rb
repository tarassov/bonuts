class ProfileAssetsController < ApiController
  include Ability

  def create
    donut_id = asset_params[:donut_id]
    donut = Donut.find(donut_id)
    if check_tenant(donut)
      profile_id  = asset_params.fetch(:profile_id, @current_profile.id)
      create_profile_asset = CreateProfileAsset.call({profile_id: profile_id, donut_id: donut_id})
      if create_profile_asset.success?
        @asset = create_profile_asset.result
        json_response(ProfileAssetSerializer.new(@asset,{}).serialized_json, :created, @asset, :bad_request)
      else
        render_error :forbiden, create_profile_asset.errors[:error].first  
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
      @asset = ProfileAsset.find(asset_params[:id])
  end
end