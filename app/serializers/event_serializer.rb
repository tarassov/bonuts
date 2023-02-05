# frozen_string_literal: true

# Event serializer class
class EventSerializer
  include JSONAPI::Serializer
  set_id :id
  set_type :event
  attributes :date_string, :id, :public, :likes, :operation

  attribute :content do |object|
    if object.event_type && object.event_type.name == 'account'
      object.extra_content
    else
      object.content
    end
  end

  attribute :liked do |record, params|
    record.liked_by(params[:profile])
  end

  attribute :extra_content do |object|
    object.extra_content if !object.event_type || object.event_type.name != 'account'
  end

  attribute :user_name do |object|
    "#{object.profile.user.first_name} #{object.profile.user.last_name}"
  end
  attribute :user_id do |object|
    object.profile.user.id
  end

  attribute :user_avatar do |object|
    object.profile.avatar
  end

  attribute :position do |object|
    department = object.profile.department
    department_name = department ? "#{department.name}, " : ''
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

  attribute :comments do |record, params|
    comments_array = []
    if params && params[:include_comments] && params[:profile]
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
    end
    comments_array
  end

  attribute :comments_count do |object|
    object.comments.count
  end
end
