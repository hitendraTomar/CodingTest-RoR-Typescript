# frozen_string_literal: true

class TodosController < ApplicationController
  before_action :set_todo, only: :update

  def update
    if @todo.update(todo_params)
      render_success_response(
        {
          todo: @todo
        }, 'Todo updated successfully', status = 200
      )
    else
      render_unprocessable_entity_response(@todo)
    end
  end

  def reset
    if Todo.update_all(checked: false)
      render_success_response(
        {
          todo: Todo.all
        }, 'Todo updated successfully', status = 200
      )
    else
      render_unprocessable_entity('Error resetting Todos. Please try again!')
    end
  end

  private

  def todo_params
    params.permit(:id, :checked)
  end

  def set_todo
    @todo = Todo.find_by_id(todo_params[:id])
  end
end
