# frozen_string_literal: true

class Api::V1::AuthenticationController < Api::V1::ApiController
  skip_before_action :authenticate_request, except: [:refresh_token]

  def refresh_token
    tenants = []
    @current_user.profiles.each do |profile|
      tenants << profile.tenant
    end
    auth_token = JsonWebToken.encode(user_id: @current_user.id)
    cookies.signed[:jwt] =
      { value: auth_token, httponly: true, same_site: 'None', secure: true }
    render json: { tenants:, username: @current_user.email,
                   auth_token:, currentTenant: @current_tenant }
    # render json: { tenants: tenants, currentTenant: params[:current_tenant], username:  @current_user.email, auth_token: JsonWebToken.encode(user_id:  @current_user.id) }
  end

  def authenticate
    command = AuthenticateUser.call(params[:email].downcase, params[:password], params[:current_tenant])
    if command.success?
      cookies.signed[:jwt] =
        { value: command.result[:auth_token], httponly: true, same_site: :none,
          secure: true, domain: :all, expires: 1.year }
      render json: command.result
    else
      # render_error :forbidden, command.errors[:user_authentication].first
      error = command.errors[:user_authentication].first
      errorMessage = error[:errorMessage]
      errorCode = error.fetch(:errorCode, 0)
      errorParams = error.fetch(:errorParams, {})

      render json: { error: true, message: errorMessage, errorText: errorMessage, errorCode:, errorParams: },
             status: :forbidden
      # render_error :forbidden, command.errors[:user_authentication].first
    end
  end

  def demo_authenticate
    command = DemoAuthenticateUser.call(params[:current_tenant])
    if command.success?
      cookies.signed[:jwt] = { value: command.result[:auth_token], httponly: true, same_site: 'None',
                               secure: true }
      render json: command.result
    else
      render_error :forbidden, command.errors[:user_authentication].first
    end
  end
end
