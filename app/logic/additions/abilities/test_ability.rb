# frozen_string_literal: true

class TestAbility
  include CanCan::Ability

  def initialize(_profile)
    can :read, Request, id: 12
  end
end
