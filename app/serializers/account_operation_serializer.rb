# frozen_string_literal: true

# Serializer for Account operation
class AccountOperationSerializer
  include JSONAPI::Serializer
  set_type :account_operation
  attributes :id, :direction, :amount, :deal, :profile

  attribute :to_profile do |record|
    ProfileSerializer.new(record.to_profile).serializable_hash[:data][:attributes] if record.to_profile
  end

  attribute :from_profile do |record|
    ProfileSerializer.new(record.from_profile).serializable_hash[:data][:attributes] if record.from_profile
  end

  attribute :created_at do |record, params|
    # will be serialized only if the :show_account key of params is true
    # record.date_string params[:current_profile]
    # params[:current_profile].id
    record.date_string(params[:current_profile])
  end

  attribute :created_at_utc, &:created_at

  attribute :from_user_name do |record|
    record.from_profile&.user&.name
  end

  attribute :deal_type do |record|
    record.deal&.deal_type
  end

  attribute :requests do |record|
    record.deal.requests if record.deal && (record.deal.deal_type == 'buy' || record.deal.deal_type == 'refund_request')
  end

  attribute :to_user_name do |record|
    record.to_profile&.user&.name
  end

  attribute :user_name do |record|
    record.account.profile&.user&.name
  end

  attribute :profile do |record|
    ProfileSerializer.new(record.account.profile).serializable_hash[:data][:attributes] if record.account.profile
  end

  # cache_options enabled: true, cache_length: 2.hours
end
