# frozen_string_literal: true

class DonutSerializer
  include JSONAPI::Serializer
  set_type :donut
  attributes :name, :price, :id, :active, :logo, :description, :likes

  attribute :expiration_date do |object|
    object.expiration_date.strftime('%Y-%m-%d')
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
end
