class FixColumnNameUuidToPublicUid < ActiveRecord::Migration[6.0]
  def self.up
    rename_column :quizzes, :uuid, :public_uid
  end

  def self.down
    rename_column :quizzes, :public_uid, :uuid
  end
end
