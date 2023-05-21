require 'rails_helper'
require 'shared_examples'

describe CreateCircle do
  shared_examples 'success' do |_params|
    it 'creates circle '

    include_examples 'success logic'
  end

  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profileAdmin = @tenant.profiles.where(admin: true)[0]
    @profileUser = @tenant.profiles.where(admin: false)[0]
  end

  context 'when success' do
    before do
      @result_success = CreateCircle.call({ profile: @profileAdmin, name: 'Test' })
    end

    include_examples 'success', {}
  end

  context 'when fails' do
    before do
      @result_fail = CreateCircle.call({ profile: @profileUser, name: 'Test' })
    end

    it 'returns error' do
      expect(@result_fail.errors.count).to eq 1
    end
  end
end
