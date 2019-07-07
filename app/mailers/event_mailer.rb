class EventMailer < ApplicationMailer

  def new_event email, content,extra_content
    @content = content
    @extra_content=extra_content
    mail(to: email, subject: ' New donuts')
  end  
end
