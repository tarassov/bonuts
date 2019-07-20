class AvatarsController < ApiController

    # these lines allow me to access the 'current_user' hash
    #skip_before_action :verify_authenticity_token
    #before_action :authenticate_user!
  
    def create
      @current_user.avatar = avatar_params[:uploaded_image]
      
      if @current_user.save
        json_response({ user: @current_user}, :ok)
      end
    end
  end


  def  avatar_params
    params.permit(:uploaded_image)
  end
