# frozen_string_literal: true

require 'rails_helper'

describe DailyJob do
  before(:context) do
    @tenant = create(:tenant_with_profiles)
    @profileAdmin = @tenant.profiles.where(:admin => true)[0]
    DonutsScheduler.create({day: DateTime.now.day, active: true, every: 'daily', tenant: @tenant, profile: @profileAdmin, amount: 10, burn_old: false})
    DonutsScheduler.create({day: DateTime.now.day+1, active: true, every: 'daily', tenant: @tenant, profile: @profileAdmin, amount: 10, burn_old: false})
    @d = DailyJob.call                          
    @d2 = DailyJob.call                          
  end

  # Фактические спецификации:
  it 'creates  1 log entry' do
    log_entry = SchedulerLog.all
    expect(log_entry.count).to  eq 1
  end

  it 'create 1 succes log entry' do
    log_entry = SchedulerLog.where(scheduler_success: true)
    expect(log_entry.count).to  eq 1
  end

  it 'give user 10 donuts' do
    expect(@profileAdmin.distrib_account.balance).to eq 10
  end


end
