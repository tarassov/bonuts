class UsersController < ApiController
  skip_before_action :authenticate_request, :only => [:register, :show_by_recover,:validate_new_email, :show_by_token,:confirm_email,:recover_password,:update_password]


  def index
    users  = User.all
    json_response(ListUserSerializer.new(users,{}).serialized_json)
  end

  def register
    ActiveRecord::Base.transaction do
      @user = User.create!(user_params)

      profile = Profile.new({tenant_id: current_tenant.id, default: true, active: true})
      profile.save
      @user.demo = current_tenant.demo
      @user.email_confirmed = current_tenant.demo
      @user.save 
      @user.profiles << profile
      profile.save
      UserMailer.registration_confirmation(@user).deliver_later unless current_tenant.demo
      event_text  = @user.name + " присоединился к проекту"
      LogPublic.call({from_profile_id: profile.id, content: event_text, notify: false})
      json_response({ user: @user}, :created)

    end  
  end

  def recover_password
    user = User.find_by_email(user_params[:email])
    if user
      user.set_recover_token
      user.save
      UserMailer.change_password(user).deliver_later unless user.demo
    end
    json_response({email_sent:true}, :ok,:user,:not_found, {email_sent: false})
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

  def show_by_token
    user  = User.find_by_confirm_token(user_params[:token])
    json_response(UserSerializer.new(user,{}).serialized_json, :ok, user, :not_found,message: 'Пользователь не найден')
  end

  def show_by_recover
    user  = User.find_by_recover_token(user_params[:recover_token])
    json_response(UserSerializer.new(user,{}).serialized_json, :ok, user, :not_found,message: 'Пользователь не найден')
  end

  def update_current
    @current_user.update(user_params)
    json_response(UserSerializer.new(@current_user,{}).serialized_json)
  end

  def update_password
      user  = User.find_by_recover_token(user_params[:recover_token])
      if user
        user.password = user_params[:password]
        user.recover_token =nil
        user.email_confirmed = true
        user.confirm_token = nil
        user.save

        command = AuthenticateUser.call(user.email, user_params[:password])
        if command.success?
          render json: { auth_token: command.result[:auth_token], tenant: command.result[:tenant], email: user.email }
        else
          render_error :forbidden, command.errors[:user_authentication].first 
        end

      else
        render_error :not_found, 'Пользователь не найден'
      end
      

    #  json_response({password_changed:true}, :ok,user, :not_found, {password_changed: false, message: 'Пользователь не найден'})
    rescue ActiveRecord::RecordNotFound
      json_response({ error: "Token not found"}, :not_found)
  end

  def confirm_email
    user  = User.find_by_confirm_token(user_params[:token])

    command = ConfirmEmail.call(user_params[:token])

    if command.success?
      json_response({ user: user, auth_token: command.result }, :created)
    else
      json_response({ error: command.errors }, :unauthorized)
    end

  rescue ActiveRecord::RecordNotFound
    json_response({ error: "Token not found"}, :not_found)
  end

  private


  def user_params
    params.permit(:email, :password, :first_name,:last_name, :sex,:notes,:token,:recover_token)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
