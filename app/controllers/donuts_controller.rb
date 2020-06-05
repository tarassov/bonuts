# frozen_string_literal: true

class DonutsController < ApiController
  include Ability

  before_action :check_admin, only: %i[create update destroy]
  before_action :set_donut, only: %i[update destroy show]
  def index
    donuts = []
    if @current_tenant
      donuts = Donut.where(tenant_id: @current_tenant.id, active: true).where('expiration_date > ? ', Date.today)
    end
    json_response DonutSerializer.new(donuts, {}).serialized_json
  end

  def show
    if check_tenant(@donut)
      json_response(DonutSerializer.new(@donut, {}).serialized_json, :ok, @donut, :not_found) && return
end
  end

  def create
    @donut = Donut.create!(donuts_params.merge(tenant_id: @current_tenant.id, user_id: @current_user.id))
    json_response(DonutSerializer.new(@donut, {}).serialized_json, :created, @donut, :bad_request)
  end

  def update
    if check_tenant(@donut)
      if @donut.update_attributes(donuts_params)
        json_response(DonutSerializer.new(@donut, {}).serialized_json, :ok)
      else
        render_error :bad_request, 'Error while updating'
      end
    end
  end

  def destroy
    @donut.destroy
    json_response(nil, :ok)
  end

  private

  def donuts_params
    params.permit(:name, :price, :id, :active)
  end

  def set_donut
    @donut = Donut.find(params[:id])
  end
end
