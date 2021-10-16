# frozen_string_literal: true

class InvitationAbility < BaseAbility
  
      
    def admin_abilities profile
      can :accept, Invitation, user: profile.user, activated: false
      can :create, Invitation
    end

    def user_abilities(profile)
      can :accept, Invitation, user: profile.user, activated: false
      can :read, Invitation, from_user: profile.user, activated: false
    end

    def member_abilities(profile)
      can :accept, Invitation, user: profile.user, activated: false
      can :read, Invitation, tenant: profile.tenant
    end

    
  end
  