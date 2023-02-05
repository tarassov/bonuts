# frozen_string_literal: true

class Event < ApplicationRecord
  include Likeable
  belongs_to :profile
  belongs_to :account, optional: true
  belongs_to :tenant
  belongs_to :account_operation, optional: true
  belongs_to :deal, optional: true
  belongs_to :event_type, optional: true
  has_many :likes, as: :likeable, dependent: :destroy
  has_many :comments, as: :commentable, dependent: :destroy

  attribute :extra_content, default: -> { '' }

  def operation
    if account_operation
      get_operation account_operation
    elsif deal
      if deal.deal_type == 'transfer' && public
        account_operations = deal.account_operations.where(direction: 1)
        if account_operations.count > 1
          { direction:, amount:, profile: null }
        elsif account_operations.count == 1
          get_operation account_operations[0]
        end
      end
    end
  end

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
                    profile:,
                    account:,
                    account_operation:,
                    content:,
                    extra_content:,
                    event_date: DateTime.now,
                    event_type:,
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
                    account_operation:,
                    content: '',
                    extra_content:,
                    event_date: DateTime.now,
                    public: false
                  })
  end

  def date_string
    # zone = ActiveSupport::TimeZone.new("Moscow")
    event_date.in_time_zone(profile.user.zone).strftime('%d/%m/%Y %H:%M') if profile
  end

  def profiles_to_notify
    users = []
    users << account.profile if account
    users << account.boss_profile if account&.boss_profile
    users << profile.boss_profile if profile&.boss_profile
    users.uniq
  end

  private

  def get_operation(account_operation)
    id = account_operation.id
    direction = account_operation.direction
    amount = account_operation.amount
    user_name = account_operation.account.profile.user.name
    position = account_operation.account.profile.position
    deal_type = account_operation.deal.deal_type
    user_avatar = account_operation.account.profile.avatar
    {
      id:,
      direction:,
      amount:,
      to_user_name: user_name,
      to_profile: {
        id: account_operation.account.profile.id,
        name: user_name,
        position:,
        avatar: user_avatar
      },
      deal_type:
    }
  end
end
