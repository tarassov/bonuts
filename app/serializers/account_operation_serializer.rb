# frozen_string_literal: true

class AccountOperationSerializer
  include JSONAPI::Serializer
  set_type :account_operation
  attributes :id, :direction, :amount, :to_profile, :from_profile, :deal

  attribute :created_at do |record, params|
    # will be serialized only if the :show_account key of params is true
    # record.date_string params[:current_profile]
    # params[:current_profile].id
    record.date_string(params[:current_profile])
  end

  attribute :from_user_name do |record|
    record.from_profile.user.name if record.from_profile
  end

  attribute :deal_type do |record|
    record.deal.deal_type if record.deal
  end

  attribute :regards do |record|
    record.deal.profile_assets if record.deal && (record.deal.deal_type == 'buy' || record.deal.deal_type == 'refund_regard')
  end

  attribute :to_user_name do |record|
    record.to_profile.user.name if record.to_profile
  end

  attribute :user_name do |record|
    record.account.profile.user.name if record.account.profile
  end

  attribute :profile do |record|
    record.account.profile
  end

  # cache_options enabled: true, cache_length: 2.hours
end
