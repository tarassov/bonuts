class EventMailer < ApplicationMailer

  def new_event email, content,extra_content,is_receiver
    @content = content
    @extra_content=extra_content
    @is_receiver  = is_receiver

    
    if is_receiver
      subject = 'У вас новые баллы' 
    else
      subject = 'Оповещение о баллах ваших сотрудников'  
    end  

    mail(to: email, subject: subject)
  end  
end
