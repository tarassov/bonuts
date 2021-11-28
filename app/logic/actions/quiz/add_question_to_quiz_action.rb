class AddQuestionToQuizAction < BaseAction
  protected

  def do_call
    @deal = Deal.create({ profile: @args[:profile], comment: nil, deal_type: 'add quiz answers' })

    question = @args[:question]
    options = @args.fetch(:options, [])
    obligatory = @args.fetch(:obligatory, false)
    from = @args.fetch(:from, 0)
    to = @args.fetch(:to, 0)
    quiz = @args[:quiz]

    if quiz.tenant != @args[:tenant]
      errors.add :error, I18n.t('wrong_tenant')
      return nil
    end

    result = QuizQuestion.create({ description: question, quiz: quiz, from: from, to: to, obligatory: obligatory,
                                   deal: @deal })

    errors.add :error, I18n.t('save_error') unless result

    options.each do |option|
      option_result = QuestionOption.create!({ quiz_question: result, value: option.value,
                                               sort_order: option.order })
      errors.add :error, I18n.t('save_error') unless option_result
    end
  end
end
