require 'rails_helper'

describe  AddAnswerToQuiz do
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]            
    @quiz = create(:quiz_with_questions, tenant:  @tenant, profile:  @profileAdmin)         
  end

  context 'when success' do
    before do
      @result_success =  AddAnswerToQuiz.call({profile: @profileAdmin, quiz: @quiz_question, value: "answer 1"}) 
    end

    it ' quiz exists ' do
      expect(Quiz.where(id: @quiz.id).count).to eq 1
    end

    it ' quiz has 10 questions ' do
      expect(Quiz.find(@quiz.id).quiz_questions.count).to eq 10
    end

    it ' quiz has 5 questions with options ' do
      questions = Quiz.find(@quiz.id).quiz_questions
      i = 0
      questions.each do |question|
          if question.question_options.count>0
            i = i + 1
          end
      end
      expect(i).to eq 5
    end

    it 'does not return error'do
      expect(@result_success.errors.count).to eq 0
    end
  end

  context 'when fails' do
    before do
      @result_fail = AddAnswerToQuiz.call({profile: @profileUser}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end

end