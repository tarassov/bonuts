# frozen_string_literal: true

class LogPublic
  prepend SimpleCommand
  def initialize(args)
    @from_profile_id = args[:from_profile_id]
    @content = args.fetch(:content, '')
    @extra_content = args.fetch(:extra_content, '')
    @notify = args.fetch(:notify, false)
    @event_type_name = args.fetch(:event_type_name, 'info')
  end

  def call
    log_public
  end

  private

  def log_public
    event = Event.log_public({
                               profile: from_profile,
                               account: nil,
                               content: @content,
                               extra_content: @extra_content,
                               event_type_name: @event_type_name
                             })

    if !from_profile.user.demo && @notify
      profiles = from_profile.tenant.profiles
      Notify.call({ profiles: profiles, sender: from_profile, content: @content, extra_content: @extra_content, event_type: event.event_type })
    end
  end

  def from_profile
    @from_profile ||= Profile.find(@from_profile_id)
  end
end
