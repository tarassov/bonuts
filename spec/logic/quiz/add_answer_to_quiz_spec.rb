require 'rails_helper'

describe AddAnswerToQuiz do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profile_admin = @tenant.profiles.where(admin: true)[0]
    @profile_user = @tenant.profiles.where(admin: false)[0]
    @quiz = create(:quiz_with_questions, tenant: @tenant, profile: @profile_admin, questions_count: 10)
  end

  context 'when success' do
    before do
      answers = []
      @quiz.quiz_questions.each do |question|
        answers << { question_id: question.id, value: Faker::Movies::BackToTheFuture.quote }
      end
      @result_success = AddAnswerToQuiz.call({ profile: @profile_admin, quiz_id: @quiz.id, quiz_answers: answers })
    end

    xit ' quiz exists ' do
      expect(Quiz.where(id: @quiz.id).count).to eq 1
    end

    xit ' quiz has 10 questions ' do
      expect(Quiz.find(@quiz.id).quiz_questions.count).to eq 10
    end

    xit ' quiz has 5 questions with options ' do
      questions = Quiz.find(@quiz.id).quiz_questions
      i = 0
      questions.each do |question|
        i += 1 if question.question_options.count > 0
      end
      expect(i).to eq 5
    end

    xit 'does not return error' do
      expect(@result_success).to has_no_result_errors
    end

    xit 'has 10 answers'
  end

  context 'when fails' do
    before do
      @result_fail = AddAnswerToQuiz.call({ profile: @profile_user })
    end

    it 'returns error' do
      expect(@result_fail.errors.count).to eq 1
    end
  end
end
