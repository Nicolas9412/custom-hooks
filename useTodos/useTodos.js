import { todoReducer } from "./todoReducer";
import { useReducer, useEffect } from "react";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);
  const todosCount = todos.length;
  const pendingTodosCount = todos.filter((todo) => !todo.done).length;
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = { type: "[TODO] Add Todo", payload: todo };
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "[TODO] Remove Todo", payload: id });
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "[TODO] Toogle Todo", payload: id });
  };

  todosCount;
  pendingTodosCount;

  return {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
