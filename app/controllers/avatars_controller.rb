class AvatarsController < ApiController

    # these lines allow me to access the 'current_user' hash
    #skip_before_action :verify_authenticity_token
    #before_action :authenticate_user!
  
    def create
      id  = avatar_params.fetch(:id, nil)
      profile = Profile.find(id)
      if check_tenant(profile)
          if check_admin || profile.id==@current_profile.id
            profile.avatar = avatar_params[:uploaded_image]
            if profile.save
              json_response({ profile: profile}, :ok)
            end
          end  
      end    
    end
  end


  def  avatar_params
    params.permit(:uploaded_image, :id)
  end
