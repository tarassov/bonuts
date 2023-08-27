class CreateTenantDailyJobLog < ActiveRecord::Migration[7.0]
  def change
    create_table :tenant_daily_job_logs do |t|
      t.references :tenant, null: false, foreign_key: true
      t.boolean :success
      t.string :error_message
      t.string :job_type
      t.datetime :job_date

      t.timestamps
    end
  end
end
