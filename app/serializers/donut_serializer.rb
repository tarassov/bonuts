# frozen_string_literal: true

class DonutSerializer
  include JSONAPI::Serializer
  set_type :donut
  attributes :name, :price, :id, :active, :logo, :description, :likes, :has_remains, :on_stock, :supply_days

  attribute :expiration_date do |object|
    object.expiration_date.strftime('%Y-%m-%d')
  end
  attribute :created_at do |object|
    object.created_at.strftime('%Y-%m-%d')
  end


  attribute :liked do |record, params|
    record.likes.any? { |like| like.profile == params[:profile] }
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
end
