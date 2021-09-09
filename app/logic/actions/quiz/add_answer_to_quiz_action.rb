class AddAnswerToQuizAction < BaseAction
  protected

  def do_call
    @deal = Deal.create({ profile: @args[:profile], comment: nil, deal_type: 'add quiz answers' })

    quiz_answers = @args[:quiz_answers]
    quiz_id = @args[:quiz_id]

    quiz =  Quiz.find(quiz_id)

    if quiz.tenant != @args[:tenant]
      errors.add :error, I18n.t('wrong_tenant')
      return nil
    end

    quiz_answers.each do |answer|
      question = QuizQuestion.find(answer[:question_id])
      if question.quiz.id != quiz.id
        errors.add :error, I18n.t('quiz.question_does_not_belong_to_quiz')
        return nil
      end

      result = QuestionAnswer.create!({ quiz_question: question, profile: @args[:profile], deal: @deal,
                                        anonymous: false, value: answer[:value] })

      errors.add :error, I18n.t('save_error') unless result
    end
  end
end
