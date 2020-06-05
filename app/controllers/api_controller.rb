# frozen_string_literal: true

class ApiController < ActionController::API
  include ExceptionHandler
  include Response
  include Ability

  before_action :authenticate_request, except: [:fallback_index_html]
  attr_reader :current_user

  def fallback_index_html
    render file: '/public/index.html'
  end

  def default_tenant
    default = Tenant.find_by_name('cki')
    default ||= Tenant.create({ id: 1, name: 'cki' })

    default
  end

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result

    if @current_user 
      locale =  @current_user.locale || I18n.default_locale
      I18n.locale =locale
    end
    
    @zone = ActiveSupport::TimeZone.new('Moscow')
    unless @current_user
      render json: { error: 'Not Authorized', errorText: 'Не авторизованый пользователь' }, status: 401
    end

    if @current_user
      if current_tenant
        @current_profile = Profile.where(tenant_id: current_tenant.id, user_id: @current_user.id).first
       end

      unless @current_profile
        render json: { error: 'Profile not found in tenant', errorText: 'Пользователь не найден в этом пространстве' }, status: 401
       end

    end
  end

  def http_auth_header
    if request.headers['Authorization'].present?
      return JSON.parse request.headers['Authorization'].split(' ').last
    end

    nil
  end

  def current_tenant
    return @current_tenant if @current_tenant

    tenant = http_auth_header['tenant']
    @current_tenant = if tenant
                        Tenant.find_by_name(tenant)
                      else
                        default_tenant
                      end
    @current_tenant
  end

  def current_position
    Position.joins(:department).where('departments.tenant_id = ' + current_tenant.id.to_s + ' and user_id = ' + @current_user.id.to_s).first
    # return Position.where(department.tenant_id: current_tenant.id, user_id: @current_user.id).first
  end
end
