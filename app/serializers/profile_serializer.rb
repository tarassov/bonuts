# frozen_string_literal: true

class ProfileSerializer
  include JSONAPI::Serializer
  set_type :profile
  set_id :id
  attributes :active, :admin, :default, :department, :position, :store_admin, :attached, :created_at, :id, :roles,
             :user_id, :phone, :bio, :in_date, :birthdate, :contact

  attribute :first_name do |profile|
    profile.user.first_name
  end

  attribute :circles do |record, _params|
    circles_array = []
    record.circles.order(created_at: :desc).each do |circle|
      circles_array << { id: circle.id, name: circle.name, active: circle.active }
    end
    circles_array
  end

  attribute :last_name do |profile|
    profile.user.last_name
  end

  # attribute :admin do |profile|
  #   # profile.admin || profile.has_role?(:admin)
  # end

  attribute :email do |profile|
    profile.user.email
  end

  attribute :sex do |profile|
    profile.user.sex
  end

  attribute :name do |profile|
    profile.user.name
  end

  attribute :user_avatar, &:avatar

  attribute :tenant do |object|
    object.tenant&.name
  end

  attribute :logo do |object|
    object.tenant&.logo
  end
  # attribute :ranking do |object|
  # object.ranking
  # end

  attribute :score_total do |object, params|
    # object.ranking  if object.self_account && params[:show_score]
    if object.self_account && params[:show_score]
      object.self_account.score_total
    elsif object.self_account && params[:show_balance]
      object.self_account.balance
    elsif object.self_account && params[:show_sent]
      object.distrib_account.sent_total
    else
      0
    end
  end

  attribute :self_account, :distrib_account, if: proc { |_record, params|
    # will be serialized only if the :show_account key of params is true
    params && params[:show_account] == true
  }

  belongs_to :user
  # cache_options enabled: true, cache_length: 2.hours
end
