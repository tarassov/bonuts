require 'rails_helper'

describe  CreateQuiz do
  before(:context) do
    @tenant = create(:tenant_with_profiles)         
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]    
    @profileUser = @tenant.profiles.where(:admin => false)[0]            
  end

  context 'when success' do
    before do
      @count_before = Quiz.all.count
      @result_success =  CreateQuiz.call({profile: @profileAdmin, name: "test quiz"}) 
    end

    it 'creates quiz' do
      expect(Quiz.all.count).to eq @count_before+1
    end

    it 'does not return error'do
      expect(@result_success.errors.count).to eq 0
    end
  end

  context 'when not admin' do
    before do
      @result_fail = CreateQuiz.call({profile: @profileUser,name: "test quiz"}) 
    end
       
    it 'returns error'do
      expect(@result_fail.errors.count).to eq 1
    end


  end
end
