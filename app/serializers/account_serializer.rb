# frozen_string_literal: true

class AccountSerializer
  include JSONAPI::Serializer
  set_type :account
  attributes :balance, :id

  attribute :last_operation do |record, params|
    # will be serialized only if the :show_account key of params is true
    # record.date_string params[:current_profile]
    # params[:current_profile].id
    record.last_operation(params[:current_profile])
  end

  # cache_options enabled: true, cache_length: 2.hours
end
