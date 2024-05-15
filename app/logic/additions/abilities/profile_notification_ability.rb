# frozen_string_literal: true

class ProfileNotificationAbility < BaseAbility
  def user_abilities(profile)
    can(:manage, ProfileNotification, profile: { id: profile.id })
  end
end
# frozen_string_literal: true
