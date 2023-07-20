# frozen_string_literal: true

class Api::V1::CirclesController < Api::V1::ApiController
  before_action :set_circle, only: %i[destroy show]

  def index
    return unless tenant?

    json_response CircleSerializer.new(Circle.where(tenant_id: current_tenant&.id)).serializable_hash.to_json
  end

  def create
    logic_call(CreateCircle, permit_params)
  end

  def update
    logic_call(UpdateCircle, permit_params)
  end

  def show; end

  def destroy
    logic_call(DeleteCircle, { id: @circle.id, circle: @circle })
  end

  private

  def permit_params
    params.permit(:id, :name, :active)
  end

  def set_circle
    @circle = Circle.find(permit_params[:id])
  end
end
