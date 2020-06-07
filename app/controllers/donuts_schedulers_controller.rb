class DonutsSchedulerController < ApiController
    include Ability
    before_action :set_scheduler, only: %i[update destroy show]

    def index
    end

    def update
        if check_tenant(@scheduler)
            if @scheduler.update_attributes(scheduler_params)
              json_response(DonutsSchedulerSerializer.new(@scheduler, {}).serialized_json, :ok)
            else
              render_error :bad_request, 'Error while updating'
            end
        end
    end

    def show
        if check_tenant(@scheduler)
            json_response(DonutsSchedulerSerializer.new(@scheduler, {}).serialized_json, :ok, @scheduler, :not_found) && return
        end
    end

    def destroy
        @scheduler.destroy
        json_response(nil, :ok)
    end 


    private 
    def set_scheduler
        @scheduler = DonutsScheduler.find(scheduler_params[:id])
    end

    
    def scheduler_params
        params.permit(:active, :id, :day, :amount, :comment, :profile_id, :burn_old)
    end


end