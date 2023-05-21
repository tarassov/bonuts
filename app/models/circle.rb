# frozen_string_literal: true

class Circle < ApplicationRecord
  validates :name, presence: true
  belongs_to :tenant
  has_many :circles_profiles, dependent: :destroy
  has_many :profiles, through: :circles_profiles, dependent: :nullify
end
