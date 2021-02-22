# frozen_string_literal: true

class Api::V1::UsersController < Api::V1::ApiController
  skip_before_action :authenticate_request, only: %i[register show_by_recover validate_new_email show_by_token confirm_email send_confirm_email recover_password update_password]

  def index
    if check_system_admin
      users = User.all
      json_response(ListUserSerializer.new(users, {}).serializable_hash.to_json)
    end  
  end

  def register
   
    operation =  Register.call(user_params)

    response = operation.response
    if (response.status != :ok)
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result }, status: response.status   
    else
      json_response(UserSerializer.new(response.result,{}).serializable_hash.to_json, :created, response.result, :bad_request)
    end  
  end

  def recover_password
    user = User.find_by_email(user_params[:email])
    if user
      user.set_recover_token
      user.save
      UserMailer.change_password(user).deliver_later unless user.demo && !Rails.env.development?
    end
    json_response({ email_sent: true }, :ok, :user, :not_found, { email_sent: false })
  end

  def send_confirm_email
    user = User.find_by_email(user_params[:email])
    if user
      unless current_tenant.demo && !Rails.env.development?
        user.reset_confirmation_token
        user.save        
        UserMailer.registration_confirmation(user).deliver_now
      end
    end
    json_response({ email_sent: true }, :ok, :user, :not_found, { email_sent: false })
  end

  def validate_new_email
    @email = params[:email]

    return json_response({ error: 'bad request' }, :bad_request) unless @email

    @user = User.find_by_email(@email)

    if @user
      json_response({ valid: false }, :ok)
    else
      json_response({ valid: true }, :ok)
    end
  end

  def show_current
    json_response(UserSerializer.new(@current_user, {}).serializable_hash.to_json)
  end

  def show_by_token
    user = User.find_by_confirm_token(user_params[:token])
    json_response(UserSerializer.new(user, {}).serializable_hash.to_json, :ok, user, :not_found, message: 'Пользователь не найден')
  end

  def show_by_recover
    user = User.find_by_recover_token(user_params[:recover_token])
    json_response(UserSerializer.new(user, {}).serializable_hash.to_json, :ok, user, :not_found, message: 'Пользователь не найден')
  end

  def update_current
    @current_user.update(user_params)
    json_response(UserSerializer.new(@current_user, {}).serializable_hash.to_json)
  end

  def update_password
    user = User.find_by_recover_token(user_params[:recover_token])
    if user
      user.password = user_params[:password]
      user.recover_token = nil
      user.email_confirmed = true
      user.confirm_token = nil
      user.active = true
      user.save

      command = AuthenticateUser.call(user.email, user_params[:password])
      if command.success?
        render json: { auth_token: command.result[:auth_token], tenants: command.result[:tenants], email: user.email }
      else
        render_error :forbidden, command.errors[:user_authentication].first
      end

    else
      render_error :not_found, 'Пользователь не найден'
    end

  #  json_response({password_changed:true}, :ok,user, :not_found, {password_changed: false, message: 'Пользователь не найден'})
  rescue ActiveRecord::RecordNotFound
    json_response({ error: 'Token not found' }, :not_found)
  end

  def confirm_email
    operation = ConfirmEmail.call({token: user_params[:token]})   
    response = operation.response
    

    if (response.status != :ok)
      render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result }, status: response.status   
    else    
      render json: {user: response.result[0][:user], auth_token: response.result[0][:auth_token]},  status:  :created
    end
  end

  private

  def user_params
    params.permit(:id,:email, :password, :first_name, :last_name, :sex, :notes, :token, :recover_token,:user)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
