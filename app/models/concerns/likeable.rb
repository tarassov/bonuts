# frozen_string_literal: true

# Likeable module to include in model
module Likeable
  def liked_by(profile)
    likes.any? { |like| like.profile == profile }
  end
end
