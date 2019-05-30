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

ActiveRecord::Schema.define(version: 2019_05_30_182233) do

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
    t.index ["account_id"], name: "index_account_operations_on_account_id"
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

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.bigint "head_user_id"
    t.bigint "tenant_id"
    t.index ["tenant_id"], name: "index_departments_on_tenant_id"
  end

  create_table "donuts", force: :cascade do |t|
    t.bigint "tenant_id"
    t.bigint "user_id"
    t.integer "price"
    t.datetime "expiration_date"
    t.string "name"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tenant_id"], name: "index_donuts_on_tenant_id"
    t.index ["user_id"], name: "index_donuts_on_user_id"
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
    t.index ["account_id"], name: "index_events_on_account_id"
    t.index ["account_operation_id"], name: "index_events_on_account_operation_id"
    t.index ["profile_id"], name: "index_events_on_profile_id"
    t.index ["tenant_id"], name: "index_events_on_tenant_id"
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "positions", force: :cascade do |t|
    t.bigint "department_id"
    t.bigint "user_id"
    t.string "position"
    t.boolean "admin"
    t.index ["department_id"], name: "index_positions_on_department_id"
    t.index ["user_id"], name: "index_positions_on_user_id"
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
    t.index ["donut_id"], name: "index_profile_assets_on_donut_id"
    t.index ["profile_id"], name: "index_profile_assets_on_profile_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.boolean "admin"
    t.bigint "tenant_id"
    t.boolean "default"
    t.bigint "user_id"
    t.boolean "active"
    t.index ["tenant_id"], name: "index_profiles_on_tenant_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "name"
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
  end

  add_foreign_key "account_operations", "account_operations", column: "parent_operation_id"
  add_foreign_key "account_operations", "accounts"
  add_foreign_key "accounts", "profiles"
  add_foreign_key "accounts", "tenants"
  add_foreign_key "departments", "tenants"
  add_foreign_key "departments", "users", column: "head_user_id"
  add_foreign_key "donuts", "tenants"
  add_foreign_key "donuts", "users"
  add_foreign_key "events", "account_operations"
  add_foreign_key "events", "accounts"
  add_foreign_key "events", "profiles"
  add_foreign_key "events", "tenants"
  add_foreign_key "events", "users"
  add_foreign_key "positions", "departments"
  add_foreign_key "positions", "users"
  add_foreign_key "profile_assets", "donuts"
  add_foreign_key "profile_assets", "profiles"
  add_foreign_key "profiles", "tenants"
  add_foreign_key "profiles", "users"
end
