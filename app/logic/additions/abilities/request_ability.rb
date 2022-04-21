# frozen_string_literal: true

class RequestAbility < BaseAbility
  
      
    def admin_abilities profile
      can :manage, Request, :profile => { :tenant => profile.tenant }  
      can :create, Request
    end

    def store_admin_abilities profile
      can :manage, Request, :profile => { :tenant => profile.tenant }  
      can :create, Request
    end

    def user_abilities(profile)
        can :read, Request, profile: profile
    end

    def member_abilities(profile)
        can :read, Request, profile: profile
    end

    
  end
  