class AddAnswerToQuiz < BaseOperation
  def do_call
    @action = @action_factory.add_answer_to_quiz @args
    # @action.attach_validator(AdminValidator.new(@args))
    @action.call
  end

  def operation_result
    @action.action_result
  end
end
