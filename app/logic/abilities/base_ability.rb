require 'cancancan'

class BaseAbility
  include CanCan::Ability

  def initialize(profile)
    return nil if !profile.present?
  
    if profile.is_a? User
        send("visitor_abilities", profile)
    else
        send("system_admin_abilities", profile) if profile.has_role? :system_admin
        send("admin_abilities", profile) if profile.has_role?(:admin) || profile.admin
        send("member_abilities", profile) 
    end    
  end

  def system_admin_abilities(profile)
    can :manage, :all
  end

  def admin_abilities(profile)
    can :manage, :all
  end

  def user_abilities(profile)
    can :manage, :all
  end

  def store_admin_abilities(profile)
    can :read, :all  
  end

  def member_abilities(profile)
    can :read, :all  
  end

  def visitor_abilities(profile)
   
  end

  def self.all_abilities
    ObjectSpace.each_object(Class).select { |klass| klass < self }
  end

  def to_list
    rules.map do |rule|
      object = { action: rule.actions, subject: rule.subjects.map{ |s| s.is_a?(Symbol) ? s : s.name } }
      object[:conditions] = rule.conditions unless rule.conditions.blank?
      object[:inverted] = true unless rule.base_behavior
      object
    end
  end
end
