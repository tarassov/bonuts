class CreateLogger < ActiveRecord::Migration[7.0]
  def change
    create_table(:app_loggers) do |t|
      t.string(:method)
      t.string(:callee)
      t.string(:body)
      t.string(:remote_ip)
      t.timestamps
    end
  end
end
