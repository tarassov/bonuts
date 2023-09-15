# frozen_string_literal: true

class Api::V1::AvatarsController < Api::V1::ApiController
  def create
    id = avatar_params.fetch(:id, nil)
    profile = Profile.find(id)
    if check_tenant(profile) && (profile.id == @current_profile.id || check_admin)
      profile.avatar = avatar_params[:uploaded_image]
      if profile.save
        json_response(ProfileSerializer.new(current_profile,
                                            { include: [:user],
                                              params: { show_account: true } }).serializable_hash.to_json, :ok)
      end
    end
  end
end

def  avatar_params
  params.permit(:uploaded_image, :id, :tenant)
end
