class CreateSchedulerLogs < ActiveRecord::Migration::Current
  def change
    create_table :scheduler_logs do |t|
      t.references :donuts_scheduler, foreign_key: true
      t.datetime :created_at
      t.datetime :updated_at
      t.references :tenant, foreign_key: true
      t.boolean :scheduler_success
      t.string :error_message
    end
  end
end
