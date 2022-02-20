# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_18_080001) do

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
    t.index ["deal_id"], name: "index_account_operations_on_deal_id"
    t.index ["parent_operation_id"], name: "index_account_operations_on_parent_operation_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "type"
    t.bigint "tenant_id"
    t.bigint "profile_id"
    t.index ["profile_id"], name: "index_accounts_on_profile_id"
    t.index ["tenant_id"], name: "index_accounts_on_tenant_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "profile_id"
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "text"
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable"
    t.index ["profile_id"], name: "index_comments_on_profile_id"
  end

  create_table "deals", force: :cascade do |t|
    t.string "comment"
    t.bigint "profile_id"
    t.datetime "created_at"
    t.string "deal_type"
    t.index ["profile_id"], name: "index_deals_on_profile_id"
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
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "profile_id"
    t.string "logo"
    t.string "description"
    t.integer "on_stock"
    t.integer "supply_days"
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

  create_table "images", force: :cascade do |t|
    t.string "image"
    t.datetime "created_at"
    t.string "imageable_type"
    t.bigint "imageable_id"
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "from_user_id", null: false
    t.bigint "tenant_id", null: false
    t.date "expiration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "activated"
    t.boolean "declined"
    t.boolean "closed"
    t.index ["from_user_id"], name: "index_invitations_on_from_user_id"
    t.index ["tenant_id"], name: "index_invitations_on_tenant_id"
    t.index ["user_id"], name: "index_invitations_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "profile_id"
    t.datetime "created_at"
    t.string "likeable_type"
    t.bigint "likeable_id"
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable"
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

  create_table "plugin_properties", force: :cascade do |t|
    t.bigint "plugin_id"
    t.string "name"
    t.string "notes"
    t.index ["plugin_id"], name: "index_plugin_properties_on_plugin_id"
  end

  create_table "plugin_settings", force: :cascade do |t|
    t.bigint "plugin_property_id"
    t.bigint "tenant_id"
    t.string "value"
    t.bigint "plugin_id"
    t.bigint "tenant_plugin_id"
    t.index ["plugin_id"], name: "index_plugin_settings_on_plugin_id"
    t.index ["plugin_property_id"], name: "index_plugin_settings_on_plugin_property_id"
    t.index ["tenant_id"], name: "index_plugin_settings_on_tenant_id"
    t.index ["tenant_plugin_id"], name: "index_plugin_settings_on_tenant_plugin_id"
  end

  create_table "plugins", force: :cascade do |t|
    t.string "name"
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
    t.integer "roles_mask"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["department_id"], name: "index_profiles_on_department_id"
    t.index ["tenant_id"], name: "index_profiles_on_tenant_id"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "question_answers", force: :cascade do |t|
    t.bigint "quiz_question_id", null: false
    t.bigint "profile_id", null: false
    t.string "value"
    t.boolean "anonymous"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "deal_id"
    t.index ["deal_id"], name: "index_question_answers_on_deal_id"
    t.index ["profile_id"], name: "index_question_answers_on_profile_id"
    t.index ["quiz_question_id"], name: "index_question_answers_on_quiz_question_id"
  end

  create_table "question_options", force: :cascade do |t|
    t.integer "sort_order"
    t.bigint "quiz_question_id", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_question_id"], name: "index_question_options_on_quiz_question_id"
  end

  create_table "quiz_questions", force: :cascade do |t|
    t.string "description"
    t.bigint "quiz_id", null: false
    t.boolean "obligatory"
    t.integer "from"
    t.integer "to"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "deal_id"
    t.index ["deal_id"], name: "index_quiz_questions_on_deal_id"
    t.index ["quiz_id"], name: "index_quiz_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "tenant_id", null: false
    t.bigint "profile_id", null: false
    t.boolean "active"
    t.boolean "closed"
    t.string "public_uid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "deal_id"
    t.index ["deal_id"], name: "index_quizzes_on_deal_id"
    t.index ["profile_id"], name: "index_quizzes_on_profile_id"
    t.index ["tenant_id"], name: "index_quizzes_on_tenant_id"
  end

  create_table "requests", force: :cascade do |t|
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
    t.boolean "deleted"
    t.index ["deal_id"], name: "index_requests_on_deal_id"
    t.index ["donut_id"], name: "index_requests_on_donut_id"
    t.index ["profile_id"], name: "index_requests_on_profile_id"
    t.index ["public_uid"], name: "index_requests_on_public_uid"
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
    t.index ["stackable_type", "stackable_id"], name: "index_stacks_on_stackable"
  end

  create_table "tenant_plugins", force: :cascade do |t|
    t.bigint "plugin_id"
    t.bigint "tenant_id"
    t.boolean "active"
    t.index ["plugin_id"], name: "index_tenant_plugins_on_plugin_id"
    t.index ["tenant_id"], name: "index_tenant_plugins_on_tenant_id"
  end

  create_table "tenant_properties", force: :cascade do |t|
    t.string "name"
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tenant_settings", force: :cascade do |t|
    t.bigint "tenant_id", null: false
    t.bigint "tenant_property_id", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tenant_id"], name: "index_tenant_settings_on_tenant_id"
    t.index ["tenant_property_id"], name: "index_tenant_settings_on_tenant_property_id"
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
    t.integer "welcome_points"
    t.integer "welcome_donuts"
    t.boolean "email_notification"
    t.integer "birthday_donuts"
    t.integer "join_to_project_donuts"
    t.integer "join_to_company_donuts"
    t.boolean "use_departments"
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
    t.datetime "created_at"
    t.datetime "updated_at"
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
  add_foreign_key "invitations", "tenants"
  add_foreign_key "invitations", "users"
  add_foreign_key "invitations", "users", column: "from_user_id"
  add_foreign_key "likes", "profiles"
  add_foreign_key "mail_settings", "tenants"
  add_foreign_key "plugin_properties", "plugins"
  add_foreign_key "plugin_settings", "plugin_properties"
  add_foreign_key "plugin_settings", "plugins"
  add_foreign_key "plugin_settings", "tenant_plugins"
  add_foreign_key "plugin_settings", "tenants"
  add_foreign_key "profiles", "departments"
  add_foreign_key "profiles", "tenants"
  add_foreign_key "profiles", "users"
  add_foreign_key "question_answers", "deals"
  add_foreign_key "question_answers", "profiles"
  add_foreign_key "question_answers", "quiz_questions"
  add_foreign_key "question_options", "quiz_questions"
  add_foreign_key "quiz_questions", "deals"
  add_foreign_key "quiz_questions", "quizzes"
  add_foreign_key "quizzes", "deals"
  add_foreign_key "quizzes", "profiles"
  add_foreign_key "quizzes", "tenants"
  add_foreign_key "requests", "deals"
  add_foreign_key "requests", "donuts"
  add_foreign_key "requests", "profiles"
  add_foreign_key "scheduler_logs", "donuts_schedulers"
  add_foreign_key "scheduler_logs", "tenants"
  add_foreign_key "stacks", "deals"
  add_foreign_key "tenant_plugins", "plugins"
  add_foreign_key "tenant_plugins", "tenants"
  add_foreign_key "tenant_settings", "tenant_properties"
  add_foreign_key "tenant_settings", "tenants"
end
