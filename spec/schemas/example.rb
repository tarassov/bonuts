object do
    string :name, min_length: 1, required: true
    array :your_ids do
      max_items 10
      unique_items true
      items type: :integer
    end
  end