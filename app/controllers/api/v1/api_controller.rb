# frozen_string_literal: true

class Api::V1::ApiController < ActionController::API
  include ExceptionHandler
  include Response
  include AbilityObsolete
  include LogicModule
  include ActionController::Cookies

  before_action :authenticate_request, except: [:fallback_index_html]
  before_action :set_csrf_cookie
  attr_reader :current_user

  rescue_from CanCan::AccessDenied do |_exception|
    render_error(status = :forbidden, errorMessage = I18n.t('validator.not_enought_permissions'))
  end

  def fallback_index_html
    render file: '/public/index.html'
  end

  def default_tenant
    default = Tenant.find_by_name('cki')
    default ||= Tenant.create({ id: 1, name: 'cki' })

    default
  end

  def current_ability
    model_name = controller_name.classify
    @current_ability ||= "#{model_name}Ability".constantize.new(@current_profile)
  end

  private

  def authenticate_request
    token = cookies.signed[:jwt]
    @current_user = AuthorizeApiRequest.call(request.headers, token).result

    if @current_user
      locale = @current_user.locale || I18n.default_locale
      I18n.locale = locale
    end

    @zone = ActiveSupport::TimeZone.new('Moscow')
    unless @current_user
      render json: { error: 'Not Authorized', errorText: 'Не авторизованый пользователь' }, status: 401
    end

    if @current_user
      if current_tenant
        @current_profile = Profile.where(tenant_id: current_tenant.id, user_id: @current_user.id).first
        unless @current_profile
          render json: { error: 'Profile not found in tenant', errorText: 'Пользователь не найден в этом пространстве' },
                 status: 401
        end
      else
        @current_profile = Profile.new
        @current_profile.user = @current_user
      end

    end
  end

  def http_auth_header
    return JSON.parse request.headers['Authorization'].split(' ').last if request.headers['Authorization'].present?

    nil
  end

  def current_tenant
    return @current_tenant if @current_tenant

    tenant = Tenant.find_by_name(permitted_params.fetch(:tenant, ''))
    if tenant
      @current_tenant = tenant
      return @current_tenant
    end

    nil
  end

  attr_reader :current_profile

  def current_position
    Position.joins(:department).where('departments.tenant_id = ' + current_tenant.id.to_s + ' and user_id = ' + @current_user.id.to_s).first
  end

  def permitted_params
    params.permit(:tenant)
  end

  def set_csrf_cookie
    # cookies['CSRF-TOKEN'] = form_authenticity_token
  end
end
