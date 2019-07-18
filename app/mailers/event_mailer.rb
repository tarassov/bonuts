class EventMailer < ApplicationMailer

  def new_event params 
    @email = params[:email]
    @content = params[:content]
    @extra_content=params[:extra_content]
    @is_receiver  = params.fetch(:is_receiver, false)
    @event_type = params.fetch(:event_type,nil)

    
    if @event_type && @event_type.name!='account'
      subject = @event_type.description
    else  
      if @is_receiver
        subject = 'У вас новые баллы' 
      else
        subject = 'Оповещение о баллах ваших сотрудников'  
      end  
    end  



    mail(to: @email, subject: subject)
  end  
end
