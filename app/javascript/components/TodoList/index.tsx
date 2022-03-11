import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import { TodoListItem } from './TodoListItem';
import { ResetButton } from "./uiComponent";
import axios from "axios";

const TodoList: React.FC<Props> = ({ todoItems }) => {
  const [todos, setTodos] =  useState(todoItems);

  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const toggleTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedTodo: TodoItem
  ): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === selectedTodo.id) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      }
      return todo;
    });
    setTodos(newTodos);

    axios.put(`/todos/${selectedTodo.id}.json`, {
      checked: e.target.checked,
    })
  };

  const resetButtonOnClick = (): void => {
    axios.post("/todos/reset.json").then(() => location.reload());
  };

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {todos.map((todo) => (
          <div key={todo.id}>
            <TodoListItem todo={todo} toggleTodo={toggleTodo} />
          </div>
        ))}
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
