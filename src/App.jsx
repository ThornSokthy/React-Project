import { useEffect, useState } from "react";
import TodoInput from "./assets/components/TodoInput";
import TodoList from "./assets/components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const storeData = (newList) => {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  };
  const handleAddTodos = (newTodo) => {
    const newTodoList = [...todos, newTodo];
    storeData(newTodoList);
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (index) => {
    const newTodoList = todos.filter((todo, todoIndex) => todoIndex !== index);
    storeData(newTodoList);
    setTodos(newTodoList);
  };

  const handleEditTodo = (index) => {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  };

  useEffect(() => {
    if (!localStorage) return;

    let lacalTodos = localStorage.getItem("todos");
    if (!lacalTodos) return;

    lacalTodos = JSON.parse(lacalTodos).todos;
    setTodos(lacalTodos);
  }, []);

  return (
    <>
      <TodoInput
        handleAddTodos={handleAddTodos}
        todoValue={todoValue}
        setTodoValue={setTodoValue}
      />
      <TodoList
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
        handleEditTodo={handleEditTodo}
      />
    </>
  );
}

export default App;
