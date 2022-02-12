# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # devise_for :admin_users, ActiveAdmin::Devise.config
  # ActiveAdmin.routes(self)
  # require 'sidekiq/web'
  # mount Sidekiq::Web => '/sidekiq'

  current_api_routes = lambda do
    post 'register', to: 'users#register'

    post 'validate_new_email', to: 'users#validate_new_email'

    post '/admin_deposit', to: 'account_operations#admin_deposit'

    post 'authenticate', to: 'authentication#authenticate'
    post 'refresh_token', to: 'authentication#refresh_token'
    post 'demo_authenticate', to: 'authentication#demo_authenticate'

    # post 'save_avatar', to: 'avatars#create'

    post '/confirm_email', to: 'users#confirm_email', as: 'confirm_email'

    get '/confirm_email', to: 'users#show_by_token'
    post '/send_confirm_email', to: 'users#send_confirm_email'

    post '/invitations/:id/accept', to: 'invitations#accept'
    post '/invitations/:id/decline', to: 'invitations#decline'
    post '/invitations' , to: 'invitations#create'
    get '/invitations' , to: 'invitations#index'
    get '/invitations/my' , to: 'invitations#my'


    get '/users/recover/', to: 'users#show_by_recover'

    get '/donuts/check_donut_name', to: 'donuts#check_donut_name'

    post 'tenant/upload_logo', to: 'tenants#upload_logo'
    get 'tenant/current', to: 'tenants#show_current'
    put 'tenant/current', to: 'tenants#update_current'
    post '/tenants/:tenant_name/join', to: 'tenants#join'
    get '/tenants/accessible', to: 'tenants#accessible'
    
    get 'profile',  to: 'profiles#show'

    put 'profile',  to: 'users#update_current'

    put '/users/password', to:  'users#recover_password'
    post '/users/password', to: 'users#update_password'

    post 'requests/activate', to: 'requests#activate'
    post 'requests/close', to: 'requests#close'
    post 'requests/rollback', to: 'requests#rollback'
    post 'requests/refund', to: 'requests#refund'
   
    

   
    resources  :self_accounts, only: [:show]
    resources  :distrib_accounts, only: [:show]
    resources :users, only: [:index]
    resources :account_operations, only: %i[create index]
    resources :profiles, only: %i[index update create]
    resources :donuts
    resources :avatars
    resources :plugins
    resources :donuts_schedulers
    resources :tenant_plugins
    resources :tenants
    resources :events, only: %i[index update show] do
      resources :comments
    end
    resources :requests, only: %i[create index show]
    resources :departments
  end

  namespace :api do
    scope module: :v1, &current_api_routes
    namespace :v1, &current_api_routes
    match ':api/*path', to: redirect('/api/v1/%{path}'), via: %i[get post put delete]
  end

  get '*path', to: 'application#fallback_index_html',
               format: false,
               defaults: { format: 'html' },
               constraints: lambda { |request|
                              !request.xhr? && request.format.html?
                            }
end
