require 'rails_helper'
require 'shared_examples'

describe CreateDonutsScheduler do
  shared_examples 'success' do |params|
    it 'creates new scheduler' do
      expect(DonutsScheduler.where(name: params[:name], amount: params[:amount], tenant: @tenant).count).to eq 1
    end

    include_examples 'success logic'
  end

  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profile_admin = @tenant.profiles.where(admin: true)[0]
    @profile_user = @tenant.profiles.where(admin: false)[0]
  end

  context 'when success' do
    before do
      @result_success = CreateDonutsScheduler.call({ profile: @profile_admin,
                                                     every: 'daily',
                                                     day: 1,
                                                     amount: 10,
                                                     execute_time: Time.now.to_i,
                                                     time_in_seconds: 6000,
                                                     timezone: 'Europe/Berlin',
                                                     name: 'test scheduler',
                                                     active: true,
                                                     burn_old: true,
                                                     tenant: @tenant, comment: 'some comment' })
    end

    include_examples 'success', { name: 'test scheduler', amount: 10, tenant: @tenant }
  end

  context 'when fails' do
    before do
      @result_fail = CreateDonutsScheduler.call({ profile: @profile_user,
                                                  every: 'daily',
                                                  amount: 10,
                                                  execute_time: Time.now.to_i,
                                                  time_in_seconds: 6000,
                                                  timezone: 'Europe/Berlin',
                                                  name: 'test scheduler',
                                                  active: true,
                                                  burn_old: true,
                                                  tenant: @tenant, comment: 'some comment' })
    end

    it 'returns error' do
      expect(@result_fail).to has_result_errors 1
    end
  end
  context 'when day was not set "daily" scheduler' do
    before do
      @result_fail = CreateDonutsScheduler.call({ profile: @profile_admin,
                                                  every: 'daily',
                                                  amount: 10,
                                                  execute_time: Time.now.to_i,
                                                  time_in_seconds: 6000,
                                                  timezone: 'Europe/Berlin',
                                                  name: 'test scheduler',
                                                  active: true,
                                                  burn_old: true,
                                                  tenant: @tenant, comment: 'some comment' })
    end

    it 'returns error' do
      expect(@result_fail).to has_result_errors 1
    end
  end
  context 'when weekday was not set for "weekly" scheduler' do
    before do
      @result_fail = CreateDonutsScheduler.call({ profile: @profile_admin,
                                                  every: 'weekly',
                                                  amount: 10,
                                                  execute_time: Time.now.to_i,
                                                  time_in_seconds: 6000,
                                                  timezone: 'Europe/Berlin',
                                                  name: 'test scheduler',
                                                  active: true,
                                                  burn_old: true,
                                                  tenant: @tenant, comment: 'some comment' })
    end

    it 'returns error' do
      expect(@result_fail).to has_result_errors 1
    end
  end
end
