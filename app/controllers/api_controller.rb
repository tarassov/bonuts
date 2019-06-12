class ApiController < ActionController::API
  include ExceptionHandler
  include Response
  include Ability

  before_action :authenticate_request, except: [:fallback_index_html]
  attr_reader :current_user



  def fallback_index_html
    render :file =>'/public/index.html'
  end

  def default_tenant
   default = Tenant.find_by_name("cki")
   if !default
    default = Tenant.create({id:1, name:"cki"})
   end

   return default
  end

 
  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    I18n.locale = @current_user.locale if @current_user
    @zone = ActiveSupport::TimeZone.new("Moscow")
    render json: { error: 'Not Authorized',errorText: 'Не авторизованый пользователь' }, status: 401 unless @current_user

    if @current_user
      tenant = http_auth_header["tenant"]
      if tenant
        @current_tenant  =  Tenant.find_by_name(tenant)
        @current_profile = Profile.where(tenant_id: @current_tenant.id, user_id: @current_user.id).first
      else
        @current_tenant =   default_tenant
        @current_profile = Profile.where(tenant_id: @current_tenant.id, user_id: @current_user.id).first if @current_tenant
      end
      
      render json: { error: 'Profile not found in tenant',errorText: 'Пользователь не найден в этом пространстве' }, status: 401 unless @current_profile
      
    end
  end

  def http_auth_header
    if request.headers['Authorization'].present?
       return JSON.parse request.headers['Authorization'].split(' ').last
    end
    nil
  end



  def current_tenant
      return @current_tenant
  end


  def current_position
     return Position.joins(:department).where("departments.tenant_id = " + current_tenant.id.to_s + " and user_id = " +  @current_user.id.to_s).first
    #return Position.where(department.tenant_id: current_tenant.id, user_id: @current_user.id).first
  end
end
