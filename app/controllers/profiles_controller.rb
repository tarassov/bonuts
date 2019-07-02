class ProfilesController < ApiController
  include Ability

  before_action :set_profile, :only => [:update,:destroy]



  def index
    profiles  = Profile.all
    json_response(ProfileSerializer.new(profiles,{include: [:user]}).serialized_json)
  end


  def show
      json_response(ProfileSerializer.new(@current_profile,{include: [:user], params: { show_account: true }}).serialized_json)
  end


  def update
    is_admin = @current_profile.admin
    if is_admin || @profile.id=@current_profile.id
      ActiveRecord::Base.transaction do
        user =@profile.user
        if is_admin
          @profile.admin = user_params[:admin]
          @profile.active = user_params[:active]
          @profile.department_id = user_params[:department_id]
          user.email = user_params[:email]
        end
        user.first_name = user_params[:first_name]
        user.last_name = user_params[:last_name]
        @profile.position =user_params[:position]
        @profile.save!
        user.save!
      end  
      json_response(ProfileSerializer.new(@current_profile,{include: [:user],}).serialized_json)
    end
  end


  private


  def user_params
    params.permit(:id, :admin, :default, :active,:first_name,:last_name,:department_id,:position,:email,:name)
  end

  def profile_params

  end

  def set_profile
    @profile = Profile.find(params[:id])
  end
end
