# frozen_string_literal: true

class PublicEventAction < BaseAction
  prepend SimpleCommand
  def initialize(args)
    @profile = args[:profile]
    @content = args.fetch(:content, '')
    @extra_content = args.fetch(:extra_content, '')
    @event_type_name = args.fetch(:event_type_name, 'info')
  end

  def call
    log_public
  end

  private

  def log_public
    event = Event.log_public({
                               profile: @profile,
                               account: nil,
                               content: @content,
                               extra_content: @extra_content,
                               event_type_name: @event_type_name
                             })
  end
end
