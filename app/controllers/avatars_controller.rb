# frozen_string_literal: true

class AvatarsController < ApiController
  # these lines allow me to access the 'current_user' hash
  # skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!

  def create
    id = avatar_params.fetch(:id, nil)
    profile = Profile.find(id)
    if check_tenant(profile)
      if profile.id == @current_profile.id || check_admin
        profile.avatar = avatar_params[:uploaded_image]
        json_response({ profile: profile }, :ok) if profile.save
      end
    end
  end
  end

def  avatar_params
  params.permit(:uploaded_image, :id)
end
