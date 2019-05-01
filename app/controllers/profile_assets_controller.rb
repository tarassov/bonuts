class ProfileAssetsController < ApplicationController
  include Ability

  def create
    if check_tenant
      profile  = Profile.find(asset_params[:profile_id])
      account  = profile.self_account
      donut = Donut.find(asset_params[:donut_id])
      if (!donut || !profile)
        render_error(:bad_request, "Bad request")
      else
        account.with_lock do
          account.withdrawal(donut.price)
          @asset = ProfileAsset.create!(asset_params)
          json_response(ProfileAssetSerializer.new(@asset,{}).serialized_json, :created, @asset, :bad_request)
        end
      end
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
