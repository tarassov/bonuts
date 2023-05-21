# frozen_string_literal: true

class Api::V1::CirclesController < Api::V1::ApiController
  before_action :set_circle, only: %i[update destroy show]

  def index
    return unless tenant?

    json_response CircleSerializer.new(Circle.where(tenant_id: current_tenant&.id)).serializable_hash.to_json
  end

  def create
    logic_call(CreateCircle, permit_params)
  end

  def update; end

  def show; end

  def destroy; end

  private

  def permit_params
    params.permit(:id, :name)
  end

  def set_circle
    @circle = Circle.find(permit_params[:id])
  end
end
