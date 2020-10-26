
class QuizzesController < ApiController
    include Ability

    def index
        quizes = []
        if @current_tenant
            quizes = Donut.where(tenant_id: @current_tenant.id, active: quiz_params[:active], closed: quiz_params[:closed])
        end
        json_response QuizSerializer.new(quizes, {}).serialized_json
    end

    def create
        @quiz = Quiz.create!(donuts_params.merge(tenant_id: @current_tenant.id, profile_id: @current_profile.id))
        json_response(QuizSerializer.new(@quiz, {}).serialized_json, :created, @quiz, :bad_request)
    end

  private

  def quiz_params
    params.permit(:name, :description, :id, :active, :closed)
  end
end
