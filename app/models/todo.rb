class Todo < ApplicationRecord

  def self.reset_all!
    Todo.update_all(checked: false)
  end
end
