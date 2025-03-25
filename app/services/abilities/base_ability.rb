require 'cancancan'

class Abilities::BaseAbility
  include CanCan::Ability

  def initialize(profile)
    if profile.blank?
      send('visitor_abilities', profile)
    else
      send('system_admin_abilities', profile) if profile.role? :system_admin
      send('admin_abilities', profile) if profile.role?(:admin) || profile.admin
      send('store_admin_abilities', profile) if profile.role?(:store_admin) || profile.store_admin
      send('member_abilities', profile) if profile.tenant.present? || profile.temp_profile?
      send('user_abilities', profile)
    end
  end

  def system_admin_abilities(profile)
    # can :manage, :all
  end

  def admin_abilities(profile)
    ;
  end

  def user_abilities(profile)
    ;
  end

  def store_admin_abilities(profile)
    ;
  end

  def member_abilities(profile)
    ;
  end

  def visitor_abilities(profile)
    ;
  end

  def self.all_abilities
    ObjectSpace.each_object(Class).select { |klass| klass < self }
  end

  def to_list
    rules.map do |rule|
      object = { action: rule.actions, subject: rule.subjects.map { |s| s.is_a?(Symbol) ? s : s.name } }
      object[:conditions] = rule.conditions if rule.conditions.present?
      object[:inverted] = true unless rule.base_behavior
      object
    end
  end
end
