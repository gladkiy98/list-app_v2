# frozen_string_literal: true

# List Controller
class ListsController < ApplicationController
  def index
    render json: current_user.lists, key_transform: :camel_lower, status: :ok
  end

  def show
    render json: list.items, status: :ok
  end

  def create
    list = current_user.lists.create(list_params)
    if list.save
      render json: list, status: :created
    else
      render json: list.errors, status: :unprocessable_entity
    end
  end

  def update
    if list.update(list_params)
      render json: list, status: :ok
    else
      render json: list.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if list.destroy
      render json: {}, status: :no_content
    else
      render json: list.errors, status: :unprocessable_entity
    end
  end

  private

  def list
    @list ||= current_user.lists.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:title)
  end
end
