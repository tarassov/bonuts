require 'rails_helper'
require 'shared_examples'



describe  DeleteDonutsScheduler do
  shared_examples "success" do |params|
    it ' do smth '

    include_examples "success logic"
  end


  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profile_admin = @tenant.profiles.where(:admin => true)[0]
    @profile_user = @tenant.profiles.where(:admin => false)[0]
  end

  context 'when success' do
    before do
      @result_success =  DeleteDonutsScheduler.call({profile: @profile_admin})
    end

    include_examples "success", {}
  end

  context 'when fails' do
    before do
      @result_fail = DeleteDonutsScheduler.call({profile: @profile_user})
    end

    it 'returns error'do
      expect(@result_fail).to has_result_errors 1
    end


  end
end
