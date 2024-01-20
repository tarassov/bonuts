class Api::V1::DonutsSchedulersController < Api::V1::ApiController
  include AbilityObsolete
  before_action :set_scheduler, only: %i[update destroy show]

  def index
    json_response DonutsSchedulerSerializer.new(DonutsScheduler.by_tenant(current_tenant&.id).order('name ASC')).serializable_hash.to_json
  end

  def update
    logic_call(UpdateDonutsScheduler, scheduler_params.merge({ donuts_scheduler: @scheduler }))
  end

  def show
    if check_tenant(@scheduler)
      json_response(DonutsSchedulerSerializer.new(@scheduler, {}).serializable_hash.to_json, :ok, @scheduler,
                    :not_found) && return
    end
  end

  def destroy
    @scheduler.destroy
    render json: nil, status: :ok
  end

  def create
    logic_call(CreateDonutsScheduler, scheduler_params)
  end

  private

  def set_scheduler
    @scheduler = DonutsScheduler.find(scheduler_params[:id])
  end

  def scheduler_params
    params.permit(:active, :id, :day, :amount, :comment, :profile_id, :burn_old, :name, :every, :day, :weekday, :execute_time, :timezone,
                  :time_in_seconds)
  end
end
