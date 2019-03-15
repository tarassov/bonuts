class DonutsController < ApplicationController

  def index
    donuts  = Array.new
    if @current_tenant
        donuts = Donuts.where(tenant_id: @current_tenant.id, active: true, expiration_date <= Date.today)
    end
    json_response(DonutSerializer.new(donuts,{}).serialized_json)
  end

  def show
    @donut = Donut.find(donuts_params[:id])
    json_response(DonutSerializer.new(donuts,{}).serialized_json, :ok, @donuts, :not_found)
  end

  def create
    @donut = Donut.create!(donuts_params.merge(:tenant_id => @current_tenant.id, :user_id => @current_user.id))
    json_response(DonutSerializer.new(donuts,{}).serialized_json, :created, @donuts, :bad_request)
  end

  def update
    @donut = Donut.find(donuts_params[:id])
    if @donut.update_attributes(donuts_params)
      json_response(DonutSerializer.new(donuts,{}).serialized_json, :ok)
    else
      render json: {:error => true, :errorMessage => 'Error while updating'}, status: :bad_request
    end
  end


  private
  def donuts_params
    params.permit(:name, :price, :id, :active)
  end
end
