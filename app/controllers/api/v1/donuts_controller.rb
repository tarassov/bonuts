# frozen_string_literal: true

class Api::V1::DonutsController < Api::V1::ApiController
  include AbilityObsolete

  before_action :check_admin, only: %i[destroy]
  before_action :check_store_admin, only: %i[update]
  before_action :set_donut, only: %i[update destroy show]
  def index
    donuts = []
    if @current_tenant
      donuts = if ActiveRecord::Type::Boolean.new.deserialize(donuts_params.fetch(:all, 'false'))
                 Donut.where(tenant_id: @current_tenant.id).left_joins(:likes)
               else
                 Donut.where(tenant_id: @current_tenant.id, active: true).where('expiration_date > ? ',
                                                                                Date.today).left_joins(:likes)
               end
    end
    json_response DonutSerializer.new(donuts, {}).serializable_hash.to_json
  end

  def show
    json_response(DonutSerializer.new(@donut, {}).serializable_hash.to_json, :ok, @donut, :not_found) if check_tenant(@donut)
  end

  def check_donut_name
    if Donut.where(tenant: @current_tenant, name: donuts_params[:name]).any?
      render_error(:forbidden, 'name has been taken')
    else
      render json: {}, status: :ok
    end
  end

  def create
    logic_call CreateDonut, donuts_params
  end

  def update
    logic_call UpdateDonut, donuts_params
  end

  def destroy
    @donut.destroy
    json_response(nil, :ok)
  end

  private

  def donuts_params
    params.permit(:name, :price, :id, :active, :expiration_date, :logo, :description, :on_stock, :supply_days, :all)
  end

  def set_donut
    @donut = Donut.find(params[:id])
  end
end
