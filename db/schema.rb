# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_24_094415) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_operations", force: :cascade do |t|
    t.integer "amount"
    t.integer "direction"
    t.bigint "parent_operation_id"
    t.bigint "account_id"
    t.string "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.bigint "deal_id"
    t.index ["account_id"], name: "index_account_operations_on_account_id"
    t.index ["deal_id"], name: "index_account_operations_on_transaction_id"
    t.index ["parent_operation_id"], name: "index_account_operations_on_parent_operation_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "type"
    t.bigint "tenant_id"
    t.bigint "profile_id"
    t.index ["profile_id"], name: "index_accounts_on_profile_id"
    t.index ["tenant_id"], name: "index_accounts_on_tenant_id"
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "profile_id"
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "text"
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["profile_id"], name: "index_comments_on_profile_id"
  end

  create_table "deals", id: :bigint, default: -> { "nextval('transactions_id_seq'::regclass)" }, force: :cascade do |t|
    t.string "comment"
    t.bigint "profile_id"
    t.datetime "created_at"
    t.string "deal_type"
    t.index ["profile_id"], name: "index_transactions_on_profile_id"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.bigint "tenant_id"
    t.bigint "head_profile_id"
    t.index ["tenant_id"], name: "index_departments_on_tenant_id"
  end

  create_table "donuts", force: :cascade do |t|
    t.bigint "tenant_id"
    t.integer "price"
    t.datetime "expiration_date"
    t.string "name"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "profile_id"
    t.index ["profile_id"], name: "index_donuts_on_profile_id"
    t.index ["tenant_id"], name: "index_donuts_on_tenant_id"
  end

  create_table "donuts_schedulers", force: :cascade do |t|
    t.bigint "tenant_id"
    t.bigint "profile_id"
    t.integer "day"
    t.integer "amount"
    t.string "comment"
    t.boolean "burn_old"
    t.boolean "active"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "every"
    t.index ["profile_id"], name: "index_donuts_schedulers_on_profile_id"
    t.index ["tenant_id"], name: "index_donuts_schedulers_on_tenant_id"
  end

  create_table "event_types", force: :cascade do |t|
    t.string "name"
    t.string "description"
  end

  create_table "events", force: :cascade do |t|
    t.bigint "tenant_id"
    t.bigint "user_id"
    t.bigint "account_id"
    t.string "content"
    t.string "extra_content"
    t.datetime "event_date"
    t.boolean "public"
    t.bigint "profile_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.bigint "account_operation_id"
    t.bigint "event_type_id"
    t.bigint "deal_id"
    t.index ["account_id"], name: "index_events_on_account_id"
    t.index ["account_operation_id"], name: "index_events_on_account_operation_id"
    t.index ["deal_id"], name: "index_events_on_deal_id"
    t.index ["event_type_id"], name: "index_events_on_event_type_id"
    t.index ["profile_id"], name: "index_events_on_profile_id"
    t.index ["tenant_id"], name: "index_events_on_tenant_id"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "profile_id"
    t.datetime "created_at"
    t.string "likeable_type"
    t.bigint "likeable_id"
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id"
    t.index ["profile_id"], name: "index_likes_on_profile_id"
  end

  create_table "mail_settings", force: :cascade do |t|
    t.bigint "tenant_id"
    t.string "address"
    t.string "encrypted_password"
    t.integer "port"
    t.string "domain"
    t.string "user_name"
    t.string "authentication"
    t.string "enable_starttls_auto"
    t.string "openssl_verify_mode"
    t.boolean "ssl"
    t.boolean "tls"
    t.index ["tenant_id"], name: "index_mail_settings_on_tenant_id"
  end

  create_table "profile_assets", force: :cascade do |t|
    t.bigint "profile_id"
    t.bigint "donut_id"
    t.datetime "date_create"
    t.datetime "date_used"
    t.boolean "enabled"
    t.integer "status"
    t.datetime "updated_at"
    t.datetime "created_at"
    t.string "public_uid"
    t.bigint "deal_id"
    t.index ["deal_id"], name: "index_profile_assets_on_deal_id"
    t.index ["donut_id"], name: "index_profile_assets_on_donut_id"
    t.index ["profile_id"], name: "index_profile_assets_on_profile_id"
    t.index ["public_uid"], name: "index_profile_assets_on_public_uid"
  end

  create_table "profiles", force: :cascade do |t|
    t.boolean "admin", default: false
    t.bigint "tenant_id"
    t.boolean "default"
    t.bigint "user_id"
    t.boolean "active"
    t.string "position"
    t.bigint "department_id"
    t.string "avatar"
    t.boolean "store_admin"
    t.index ["department_id"], name: "index_profiles_on_department_id"
    t.index ["tenant_id"], name: "index_profiles_on_tenant_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "scheduler_logs", force: :cascade do |t|
    t.bigint "donuts_scheduler_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.bigint "tenant_id"
    t.boolean "scheduler_success"
    t.string "error_message"
    t.index ["donuts_scheduler_id"], name: "index_scheduler_logs_on_donuts_scheduler_id"
    t.index ["tenant_id"], name: "index_scheduler_logs_on_tenant_id"
  end

  create_table "stacks", force: :cascade do |t|
    t.bigint "deal_id"
    t.string "stackable_type"
    t.bigint "stackable_id"
    t.index ["deal_id"], name: "index_stacks_on_deal_id"
    t.index ["stackable_type", "stackable_id"], name: "index_stacks_on_stackable_type_and_stackable_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "name"
    t.boolean "test"
    t.string "caption"
    t.boolean "active"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "domain"
    t.boolean "demo"
    t.string "logo"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "last_name"
    t.string "first_name"
    t.string "notes"
    t.string "sex"
    t.boolean "active"
    t.string "locale"
    t.string "zone"
    t.boolean "email_confirmed"
    t.string "confirm_token"
    t.string "recover_token"
    t.boolean "demo"
    t.string "avatar"
    t.boolean "system_admin"
  end

  add_foreign_key "account_operations", "account_operations", column: "parent_operation_id"
  add_foreign_key "account_operations", "accounts"
  add_foreign_key "account_operations", "deals"
  add_foreign_key "accounts", "profiles"
  add_foreign_key "accounts", "tenants"
  add_foreign_key "comments", "profiles"
  add_foreign_key "deals", "profiles"
  add_foreign_key "departments", "profiles", column: "head_profile_id"
  add_foreign_key "departments", "tenants"
  add_foreign_key "donuts", "profiles"
  add_foreign_key "donuts", "tenants"
  add_foreign_key "donuts_schedulers", "profiles"
  add_foreign_key "donuts_schedulers", "tenants"
  add_foreign_key "events", "account_operations"
  add_foreign_key "events", "accounts"
  add_foreign_key "events", "deals"
  add_foreign_key "events", "event_types"
  add_foreign_key "events", "profiles"
  add_foreign_key "events", "tenants"
  add_foreign_key "events", "users"
  add_foreign_key "likes", "profiles"
  add_foreign_key "mail_settings", "tenants"
  add_foreign_key "profile_assets", "deals"
  add_foreign_key "profile_assets", "donuts"
  add_foreign_key "profile_assets", "profiles"
  add_foreign_key "profiles", "departments"
  add_foreign_key "profiles", "tenants"
  add_foreign_key "profiles", "users"
  add_foreign_key "scheduler_logs", "donuts_schedulers"
  add_foreign_key "scheduler_logs", "tenants"
  add_foreign_key "stacks", "deals"
end
