class CreateQuizAction < BaseAction
  protected

  def do_call
    @deal = Deal.create({ profile: @args[:profile], comment: nil, deal_type: 'create quiz' })
    Quiz.create!({ profile: @args[:profile], tenant: @args[:tenant], name: @args[:name], deal: @deal })

    # rescue StandardError => e
    # errors.add :error,  e.message
    # end
  end
end
