class LogPublic
    prepend SimpleCommand
    def initialize args
        @from_profile_id = args[:from_profile_id]
        @content = args[:content]
        @extra_content = args.fetch(:extra_content,"")
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
            extra_content: @extra_content
        })
    end

    def from_profile
        @from_profile ||= Profile.find(@from_profile_id)
    end
end
