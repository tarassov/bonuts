# frozen_string_literal: true

class CirclesProfile < ApplicationRecord
  belongs_to :profile
  belongs_to :circle
  validates :profile, :circle, presence: true
end
