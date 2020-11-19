class CreateQuizAction < BaseAction
   
    protected
    def do_call 
      @deal = Deal.create({profile: @args[:profile], comment: nil, deal_type: 'create quiz'})
      quiz =  Quiz.create!({profile: @args[:profile], tenant: @args[:tenant], name: @args[:name], deal: @deal})
      return quiz

   # rescue StandardError => e  
     # errors.add :error,  e.message  
    #end
    end
end
  
   