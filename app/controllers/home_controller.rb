# frozen_string_literal: true

class HomeController < ApplicationController
  def landing
    @todos = Todo.all.order(:id)
  end
end
