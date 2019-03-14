class DonutsController < ApplicationController

  def index
    donuts  = Array.new
    if @current_tenant
        donuts = Donuts.where(tenant_id: @current_tenant.id, active: true, expiration_date <= Date.today)
    end
    json_response(DonutSerializer.new(donuts,{}).serialized_json)
  end



  private
  def donuts_params
    params.permit(:name, :price)
  end
end
