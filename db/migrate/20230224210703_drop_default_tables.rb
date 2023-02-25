class DropDefaultTables < ActiveRecord::Migration[7.0]
  def change
    drop_table :comments
    drop_table :articles
  end
end
