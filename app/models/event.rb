# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :profile
  belongs_to :account, optional: true
  belongs_to :tenant
  belongs_to :account_operation, optional: true
  belongs_to :event_type, optional: true
  has_many :likes, as: :likeable, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy

  # before_save :default_values

  def self.log_public(args)
    profile = args[:profile]
    content = args[:content]
    extra_content = args.fetch(:extra_content, '')
    account = args.fetch(:account, nil)
    account_operation = args.fetch(:account_operation, nil)
    account = account_operation.account if account_operation
    event_type_name = args.fetch(:event_type_name, 'account')

    event_type = EventType.find_by_name(event_type_name)

    Event.create!({
                    tenant: profile.tenant,
                    profile: profile,
                    account: account,
                    account_operation: account_operation,
                    content: content,
                    extra_content: extra_content,
                    event_date: DateTime.now,
                    event_type: event_type,
                    public: true
                  })
  end

  def self.log_operation(args)
    account_operation = args[:account_operation]
    extra_content = args.fetch(:extra_content, '')

    Event.create!({
                    tenant: account_operation.account.tenant,
                    profile: account_operation.account.profile,
                    account: account_operation.account,
                    account_operation: account_operation,
                    content: '',
                    extra_content: extra_content,
                    event_date: DateTime.now,
                    public: false
                  })
  end

  def date_string
    # zone = ActiveSupport::TimeZone.new("Moscow")
    if profile
      event_date.in_time_zone(profile.user.zone).strftime('%d/%m/%Y %H:%M')
    end
  end

  def profiles_to_notify
    users = []
    users << account.profile if account
    users << account.boss_profile if account&.boss_profile
    users << profile.boss_profile if profile&.boss_profile
    users.uniq
  end
end
