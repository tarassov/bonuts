# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"
  # devise_for :admin_users, ActiveAdmin::Devise.config
  # ActiveAdmin.routes(self)
  require "sidekiq/web"
  mount Sidekiq::Web => "/sidekiq"

  namespace :api do
    namespace :v1 do
      post("/admin_deposit", to: "account_operations#admin_deposit")

      post("authenticate", to: "authentication#authenticate")
      post("logout", to: "authentication#logout")
      post("refresh_token", to: "authentication#refresh_token")
      post("demo_authenticate", to: "authentication#demo_authenticate")

      # post 'save_avatar', to: 'avatars#create'

      post("/confirm_email", to: "users#confirm_email", as: "confirm_email")

      get("/confirm_email", to: "users#show_by_token")
      post("/send_confirm_email", to: "users#send_confirm_email")

      post("/invitations/:id/accept", to: "invitations#accept")
      post("/invitations/:id/decline", to: "invitations#decline")
      post("/invitations", to: "invitations#create")
      get("/invitations", to: "invitations#index")
      get("/invitations/my", to: "invitations#my")

      get("/users/recover/", to: "users#show_by_recover")

      get("/donuts/check_donut_name", to: "donuts#check_donut_name")

      post("tenant/upload_logo", to: "tenants#upload_logo")
      get("tenant/current", to: "tenants#show_current")
      put("tenant/current", to: "tenants#update_current")
      post("/tenants/:tenant_name/join", to: "tenants#join")
      get("/tenants/accessible", to: "tenants#accessible")

      get("profile", to: "profiles#current")
      put("profile", to: "users#update_current")
      post("/profiles/:id/set_activity", to: "profiles#set_activity")

      put("/users/password", to: "users#recover_password")
      post("/users/password", to: "users#update_password")

      get("reports/profiles", to: "reports#profiles")

      post("test", to: "tests#create")

      post("/telegram/message", to: "telegram#message")

      resources :ties, only: [:index]
      resources :self_accounts, only: [:show]
      resources :accounts, only: [:show]
      resources :distrib_accounts, only: [:show]
      resources :users, only: [:index] do
        collection do
          post :register
          post :validate_new_email
        end
      end
      resources :account_operations, only: [:create, :index]
      resources :profiles
      resources :donuts
      resources :avatars
      resources :plugins, only: [:index] do
        member do
          post :activate
        end
      end
      resources :donuts_schedulers
      resources :profile_notifications, only: [:index, :update]
      resources :tenant_plugins
      resources :tenants
      resources :circles
      resources :events, only: [:index, :update, :show] do
        resources :comments
      end
      resources :requests, only: [:create, :index, :show] do
        collection do
          post :activate
          post :rollback
          post :close
          post :refund
        end
      end
      resources :departments
    end
  end
end
