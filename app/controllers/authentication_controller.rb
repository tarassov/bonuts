class AuthenticationController < ApiController
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])
    if command.success?
      render json: command.result 
    else
      render_error :forbidden, command.errors[:user_authentication].first 
    end
  end

  def demo_authenticate
    command = DemoAuthenticateUser.call()
    if command.success?
      render json: command.result 
    else
      render_error :forbidden, command.errors[:user_authentication].first 
    end
  end
end
