# frozen_string_literal: true

class Api::V1::CirclesController < Api::V1::ApiController
  before_action :set_circle, only: %i[destroy show update]

  def index
    if show_disabled?
      json_response CircleSerializer.new(Circle.by_tenant(current_tenant&.id)).serializable_hash.to_json
    else
      json_response CircleSerializer.new(Circle.active.where(tenant_id: current_tenant&.id)).serializable_hash.to_json
    end
  end

  def create
    logic_call(CreateCircle, permit_params)
  end

  def update
    logic_call(UpdateCircle, permit_params.merge({ circle: @circle }))
  end

  def show
    json_response CircleSerializer.new(@circle).serializable_hash.to_json
  end

  def destroy
    logic_call(DeleteCircle, { id: permit_params[:id], circle: @circle })
  end

  private

  def permit_params
    params.permit(:id, :name, :active, :tenant)
  end

  def set_circle
    @circle = Circle.where({ id: permit_params[:id], tenant: current_tenant&.id }).first
  end
end
