class AvatarsController < ApiController

    # these lines allow me to access the 'current_user' hash
    #skip_before_action :verify_authenticity_token
    #before_action :authenticate_user!
  
    def create
      id  = avatar_params.fetch(:id, nil)
      user = User.find(id)
      user.avatar = avatar_params[:uploaded_image]
      
      if user.save
        json_response({ user: user}, :ok)
      end
    end
  end


  def  avatar_params
    params.permit(:uploaded_image, :id)
  end
