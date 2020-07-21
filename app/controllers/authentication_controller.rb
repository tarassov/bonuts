# frozen_string_literal: true

class AuthenticationController < ApiController
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])
    if command.success?
      render json: command.result
    else
      # render_error :forbidden, command.errors[:user_authentication].first
      error = command.errors[:user_authentication].first
      errorMessage = error[:errorMessage]
      errorCode = error.fetch(:errorCode, 0)
      errorParams = error.fetch(:errorParams, {})
      render json: { error: true, message: errorMessage, errorText: errorMessage, errorCode: errorCode, errorParams: errorParams }, status: :forbidden
      # render_error :forbidden, command.errors[:user_authentication].first
    end
  end

  def demo_authenticate
    command = DemoAuthenticateUser.call
    if command.success?
      render json: command.result
    else
      render_error :forbidden, command.errors[:user_authentication].first
    end
  end
end
