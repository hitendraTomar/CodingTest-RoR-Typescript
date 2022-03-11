import React, { useEffect } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";

type Todo = {
  id: number;
  title: string;
  checked: boolean;
};

type ToggleTodo = (selectedTodo: Todo) => void;

type Props = {
  todo: Todo;
  toggleTodo: ToggleTodo;
};

export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={(e) => {
            toggleTodo(e, todo);
          }}
        />{' '}
        {todo.title}
      </label>
    </li>
  );
};
