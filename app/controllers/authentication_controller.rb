class AuthenticationController < ApiController
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])
    if command.success?
      # send_message 'authenticated'
      render json: { auth_token: command.result }
    else
      #render_error (:unauthorized, command.errors[0])
      render_error :forbidden, 'Wrong credetialis'
      #render json: { error: command.errors }, status: :unauthorized
    end
  end
end
