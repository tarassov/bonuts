# frozen_string_literal: true

class Api::V1::AuthenticationController < Api::V1::ApiController
  skip_before_action :authenticate_request, except: [:refresh_token]

  def refresh_token
    tenants = Array.new
    @current_user.profiles.each do |profile|
      tenants << profile.tenant.name
    end
    render json: { tenants: tenants, username:  @current_user.email, auth_token: JsonWebToken.encode(user_id:  @current_user.id) }
    
  end



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
