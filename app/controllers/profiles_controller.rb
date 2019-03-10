class ProfilesController < ApiController
  belongs_to :user

  def index
    users  = User.all
    json_response(ListUserSerializer.new(users,{}).serialized_json)
  end


  def show
      json_response(ProfileSerializer.new(@current_profile,{ params: { show_account: true }}).serialized_json)
  end


  def update
    @current_profile.update(user_params)
    json_response(ProfileSerializer.new(@current_profile,{}).serialized_json)
  end


  private


  def user_params
    params.permit(:id, :admin, :default, :active)
  end

  def set_profile
    @profile = Profile.find(params[:id])
  end
end
