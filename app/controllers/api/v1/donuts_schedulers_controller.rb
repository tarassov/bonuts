class Api::V1::DonutsSchedulersController < Api::V1::ApiController
  include AbilityObsolete
  before_action :set_scheduler, only: %i[update destroy show]

  def index
    schedulers = []
    schedulers = DonutsScheduler.where(tenant_id: @current_tenant.id) if @current_tenant
    json_response DonutsSchedulerSerializer.new(schedulers, {}).serializable_hash.to_json
  end

  def update
    if check_tenant(@scheduler)
      if @scheduler.update(scheduler_params)
        json_response(DonutsSchedulerSerializer.new(@scheduler, {}).serializable_hash.to_json, :ok)
      else
        render_error :bad_request, 'Error while updating'
      end
    end
  end

  def show
    if check_tenant(@scheduler)
      json_response(DonutsSchedulerSerializer.new(@scheduler, {}).serializable_hash.to_json, :ok, @scheduler,
                    :not_found) && return
    end
  end

  def destroy
    @scheduler.destroy
    json_response(nil, :ok)
  end

  def create
    @scheduler = DonutsScheduler.create!(scheduler_params.merge(tenant_id: @current_tenant.id,
                                                                profile_id: @current_profile.id))
    json_response(DonutsSchedulerSerializer.new(@scheduler, {}).serializable_hash.to_json, :created, @scheduler,
                  :bad_request)
  end

  private

  def set_scheduler
    @scheduler = DonutsScheduler.find(scheduler_params[:id])
  end

  def scheduler_params
    params.permit(:active, :id, :day, :amount, :comment, :profile_id, :burn_old)
  end
end
