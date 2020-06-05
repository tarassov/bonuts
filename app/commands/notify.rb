# frozen_string_literal: true

class Notify
  prepend SimpleCommand
  def initialize(args)
    @profiles = args[:profiles]
    @sender = args[:sender]
    @content = args.fetch(:content, '')
    @extra_content = args.fetch(:extra_content, '')
    @event_type = args.fetch(:event_type, nil)
  end

  def call
    send_mail
  end

  private

  def send_mail
    content = @sender.user.name + ' пишет: ' + @content if @content
    @profiles.each do |profile|
      EventMailer.new_event({
                              email: profile.user.email,
                              content: content,
                              extra_content: @extra_content,
                              event_type: @event_type
                            }).deliver_later
    end
  end
end
