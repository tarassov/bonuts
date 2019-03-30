class DonutsController < ApiController

  def index
    donuts  = Array.new
    if @current_tenant
        donuts = Donut.where(tenant_id: @current_tenant.id, active: true).where("expiration_date > ? ", Date.today)
    end
    json_response DonutSerializer.new(donuts,{}).serialized_json
  end

  def show
    @donut = Donut.find(donuts_params[:id])
    json_response(DonutSerializer.new(donuts,{}).serialized_json, :ok, @donuts, :not_found)
  end

  def create
    if  @current_profile && @current_profile.admin
      @donut = Donut.create!(donuts_params.merge(:tenant_id => @current_tenant.id, :user_id => @current_user.id))
      json_response(DonutSerializer.new(@donut,{}).serialized_json, :created, @donut, :bad_request)
    else
      render_error
    end
  end

  def update
    @donut = Donut.find(donuts_params[:id])
    if @donut.update_attributes(donuts_params)
      json_response(DonutSerializer.new(donuts,{}).serialized_json, :ok)
    else
      render_error :bad_request, 'Error while updating'
    end
  end


  private
  def donuts_params
    params.permit(:name, :price, :id, :active)
  end
end
