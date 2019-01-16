class UsersController < ApiController
  skip_before_action :authenticate_request, :only => [:register, :validate_new_email]

  def register
    @user = User.create!(user_params)

  
    command = AuthenticateUser.call(user_params[:email], user_params[:password])
    if command.success?
      json_response({ user: @user, auth_token: command.result }, :created)
    else
      json_response({ error: command.errors }, :unauthorized)
    end
  end


  def validate_new_email
    @email = params[:email]

    unless @email
      return json_response({error: 'bad request'}, :bad_request)
    end

    @user = User.find_by_email(@email)

    if @user
      json_response({valid:false}, :ok)
    else
      json_response({valid:true}, :ok)
    end
  end

  def show_current
    json_response(UserSerializer.new(@current_user,{}).serialized_json)
  end


  def update_current
    @current_user.update(user_params)
    json_response(UserSerializer.new(@current_user,{}).serialized_json)
  end

  private


  def user_params
    params.permit(:name, :email, :password, :first_name,:last_name, :sex,:notes)
  end

  def set_user
    @user = User.find(params[:id])
  end
end