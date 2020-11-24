require 'rails_helper'


describe  AddAnswerToQuiz do
  include CustomMatchers
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]            
    @quiz = create(:quiz_with_questions, tenant:  @tenant, profile:  @profileAdmin, questions_count: 10)         
  end

  context 'when success' do
    before do
      answers = Array.new
      @quiz.quiz_questions.each do |question|
        answers<<{question_id: question.id, value: Faker::Movies::BackToTheFuture.quote }
      end
      @result_success =  AddAnswerToQuiz.call({profile: @profileAdmin, quiz_id: @quiz.id, quiz_answers: answers}) 
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
      expect(@result_success).to has_no_result_errors
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