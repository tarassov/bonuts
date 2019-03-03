class ApiController < ActionController::API
  include ExceptionHandler
  include Response
  include Ability

  before_action :authenticate_request, except: [:fallback_index_html]
  attr_reader :current_user



  def fallback_index_html
    render :file =>'/public/index.html'
  end



  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    I18n.locale = @current_user.locale if @current_user
    @zone = ActiveSupport::TimeZone.new("Moscow")
    render json: { error: 'Not Authorized',errorText: 'Не авторизованый пользователь' }, status: 401 unless @current_user
  end

  def http_auth_header
    if request.headers['Authorization'].present?
       return JSON.parse request.headers['Authorization'].split(' ').last
    end
    nil
  end

  def current_tenant
    tenant = http_auth_header["tenant"]
    return Tenant.find_by_name(tenant) if tenant
  end

  def current_position
     return Position.joins(:department).where("departments.tenant_id = " + current_tenant.id.to_s + " and user_id = " +  @current_user.id.to_s).first
    #return Position.where(department.tenant_id: current_tenant.id, user_id: @current_user.id).first
  end
end
