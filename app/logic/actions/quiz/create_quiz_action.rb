class CreateQuizAction < BaseAction
   
    protected
    def do_call 
      quiz =  Quiz.create!({profile: @args[:profile], tenant: @args[:tenant], name: @args[:name]})
      return quiz

   # rescue StandardError => e  
     # errors.add :error,  e.message  
    #end
    end
end
  
   