# frozen_string_literal: true

class InvitationAbility < BaseAbility
  
      
    def admin_abilities profile
      can :manage, Invitation, tenant: profile.tenant 
    end

    def
  end
  