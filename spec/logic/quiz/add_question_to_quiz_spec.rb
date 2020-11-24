require 'rails_helper'

describe  AddQuestionToQuiz do
  before(:context) do
    @tenant = create(:tenant_with_profiles)    
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]            
    @quiz = create(:quiz, tenant:  @tenant, profile:  @profileAdmin)    
   
  end

  context 'when success' do
    before do
      @result_success =  AddQuestionToQuiz.call({profile: @profileAdmin, quiz: @quiz, question: Faker::Movies::BackToTheFuture.quote}) 
    end
    it ' do smth '

    it 'does not return error'do
      expect(@result_success).to has_no_result_errors
    end
  end

  context 'when different tenants' do
    before do
      @tenant2 = create(:tenant_with_profiles)  
      @profileAdmin2 = @tenant2.profiles.where(:admin => true)[0]       

      @result_success =  AddQuestionToQuiz.call({profile: @profileAdmin2, quiz: @quiz, question: Faker::Movies::BackToTheFuture.quote}) 
    end
       
    it 'returns error'do
      expect(@result_success).to has_result_errors 1
    end


  end
end
