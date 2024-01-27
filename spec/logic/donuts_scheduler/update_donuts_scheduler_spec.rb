require 'rails_helper'
require 'shared_examples'

describe UpdateDonutsScheduler do
  shared_examples 'success' do |_params|
    it 'updates scheduler' do
      expect(DonutsScheduler.find(@schedulers[0].id).name).to eq 'test scheduler'
    end

    include_examples 'success logic'
  end

  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profile_admin = @tenant.profiles.where(admin: true)[0]
    @schedulers = create_list(:donuts_scheduler, 10, profile: @profile_admin, tenant: @tenant)
    @profile_user = @tenant.profiles.where(admin: false)[0]
  end

  context 'when success' do
    before do
      @result_success = UpdateDonutsScheduler.call({ profile: @profile_admin,
                                                     every: 'daily',
                                                     day: 1,
                                                     amount: 10,
                                                     execute_time: Time.now.to_i,
                                                     timezone: 'Europe/Berlin',
                                                     name: 'test scheduler',
                                                     active: true,
                                                     burn_old: true,
                                                     id: @schedulers[0].id,
                                                     donuts_scheduler: @schedulers[0],
                                                     tenant: @tenant, comment: 'some comment' })
    end

    include_examples 'success', {}
  end

  context 'when non admin user tries to update' do
    before do
      @result_fail = UpdateDonutsScheduler.call({ profile: @profile_user,
                                                  every: 'daily',
                                                  day: 1,
                                                  amount: 10,
                                                  execute_time: Time.now.to_i,
                                                  timezone: 'Europe/Berlin',
                                                  name: 'test scheduler',
                                                  active: true,
                                                  burn_old: true,
                                                  id: @schedulers[0].id,
                                                  donuts_scheduler: @schedulers[0],
                                                  tenant: @tenant, comment: 'some comment' })
    end

    it 'returns error' do
      expect(@result_fail).to has_result_errors 1
    end
  end
end
