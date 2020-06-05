# frozen_string_literal: true

class EventSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  set_type :event
  attributes :date_string, :id, :public, :likes

  attribute :content do |object|
    if object.event_type && object.event_type.name == 'account'
      object.extra_content
    else
      object.content
    end
  end

  attribute :extra_content do |object|
    if !object.event_type || object.event_type.name != 'account'
      object.extra_content
    end
  end

  attribute :user_name do |object|
    object.profile.user.first_name + ' ' + object.profile.user.last_name
  end
  attribute :user_id do |object|
    object.profile.user.id
  end

  attribute :user_avatar do |object|
    object.profile.avatar
  end

  attribute :operation do |object|
    if object.account_operation
      direction = object.account_operation.direction if object.account_operation
      amount = object.account_operation.amount if object.account_operation
      if object.account_operation
        user_name = object.account_operation.account.profile.user.name
      end
      if object.account_operation
        position = object.account_operation.account.profile.position
      end
      if object.account_operation
        user_avatar = object.account_operation.account.profile.avatar
      end
      operation = { direction: direction, amount: amount, profile: { user_name: user_name, position: position, user_avatar: user_avatar } }
    else
      operation = nil
    end
  end

  attribute :position do |object|
    department = object.profile.department
    department_name = department ? department.name + ', ' : ''
    position_name = object.profile.position || ''
    department_name + position_name
  end

  attribute :event_name do |object|
    if object.event_type
      object.event_type.name
    else
      ''
    end
  end

  attribute :liked do |record, params|
    record.likes.any? { |like| like.profile == params[:profile] }
  end

  attribute :comments do |record, params|
    if params && params[:include_comments] && params[:profile]
      comments_array = []
      record.comments.order(created_at: :desc).each do |comment|
        comments_array << { id: comment.id, content: comment.text, likes: comment.likes, public: true,
                            user_avatar: comment.profile.avatar,
                            user_name: comment.profile.user.name,
                            position: comment.profile.position,
                            profile: {
                              id: comment.profile.id,
                              name: comment.profile.user.name,
                              user_avatar: comment.profile.avatar
                            },
                            date_string: comment.created_at.in_time_zone(params[:profile].user.zone).strftime('%d/%m/%Y %H:%M') }
      end
      comments_array
    end
  end

  attribute :comments_count do |object|
    object.comments.count
  end
end
