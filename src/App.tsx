import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (todo.trim()) {
      setTodos([...todos, { id: Date.now(), todo: todo.trim(), isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const active = [...todos];
    const completed = [...completedTodos];

    const sourceList = source.droppableId === "TodosList" ? active : completed;
    const destinationList =
      destination.droppableId === "TodosList" ? active : completed;
    const [movedTodo] = sourceList.splice(source.index, 1);

    destinationList.splice(destination.index, 0, {
      ...movedTodo,
      isDone: destination.droppableId !== "TodosList",
    });

    setTodos(active);
    setCompletedTodos(completed);
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <DragDropContext onDragEnd={onDragEnd}>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </DragDropContext>
    </div>
  );
};

export default App;
