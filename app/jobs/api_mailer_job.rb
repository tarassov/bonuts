# frozen_string_literal: true

require "unigo/sender"
require "json"
class ApiMailerJob < ApplicationJob
  # Set the Queue as Default
  queue_as :default

  def perform(params)
    @email = params[:email]
    @from_name = params.fetch(:from_name, nil)
    @main_text = params.fetch(:main_text, "")
    @secondary_text = params.fetch(:secondary_text, "")
    @title = params.fetch(:title, "")
    @link = params.fetch(:link, "")
    @link_name = params.fetch(:link_name, "")
    @footer = params.fetch(:footer, false)
    @subject = params.fetch(:subject, nil)
    @bypass = params.fetch(:bypass, false)
    @template = params.fetch(:template, nil)

    if client
      message = {}

      # In case template_id is not specified, subject and body are mandatory
      message[:subject] = @subject
      message[:body] = { "html": "<h3>#{@title}</h3><div><p>#{@main_text}<br></p></div><div><p>#{@footer}</p></div>", "plaintext": @main_text } unless @template

      message[:from_email] = "no-reply@mailer.bonuts.ru"
      message[:from_name] = @from_name || "Mr. Donut"

      if @bypass
        message[:bypass_unsubscribed] = 1
        message[:bypass_global] = 1
        message[:bypass_unavailable] = 1
        message[:skip_unsubscribe] = 1
      end
      message[:recipients] = []

      message[:template_engine] = "simple"
      message[:template_id] = Rails.configuration.app_variables[@template] if @template

      message[:recipients] << {
        email: @email,
        substitutions: {
          "title" => @title || "",
          "main_text" => @main_text || "",
          "link" => @link || "",
          "link_name" => @link_name || "",
          "secondary_text" => @secondary_text || "",
          "footer" => @footer || "",
        },
      }

      begin
        client.send_email(message: message)
      rescue Faraday::Error => err
        raise err.response[:body] # raise Exception, { message: "Send error to #{@email} with subject #{@subject}" }
      end
    end
  end

  protected

  def client
    @client ||= Unigo::Sender::Client.new
  end
end
