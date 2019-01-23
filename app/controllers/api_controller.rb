class ApiController < ActionController::API
  include Response
  include ExceptionHandler


  before_action :authenticate_request, except: [:fallback_index_html]
  attr_reader :current_user

  def fallback_index_html
    render :file =>'/public/index.html'
  end

  private

  def authenticate_request
    @token = request.headers["Authorization"]
    @current_user = AuthorizeApiRequest.call(request.headers).result
    I18n.locale = @current_user.locale
    @zone = ActiveSupport::TimeZone.new("Moscow")
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
