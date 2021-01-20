
class Api::V1::QuizzesController < Api::V1::ApiController
    include Ability

    def index
        quizes = []
        if @current_tenant
            quizes = Donut.where(tenant_id: @current_tenant.id, active: quiz_params[:active], closed: quiz_params[:closed])
        end
        json_response QuizSerializer.new(quizes, {}).serializable_hash.to_json
    end

    def create
        operation =  CreateQuiz.call({
          tenant: @current_tenant,
          profile: @current_profile,
          plugin_id: permit_params[:plugin_id]
        })

        response = operation.response
        if (response.status != :ok)
          render json: { error: response.error, message: response.message, errorText: response.error_text, result: response.result }, status: response.status   
        else
          json_response(QuizSerializer.new(response.result,{}).serializable_hash.to_json, :ok, response.result, :bad_request)
        end  
    end

  private

  def quiz_params
    params.permit(:name, :description, :id, :active, :closed)
  end
end
