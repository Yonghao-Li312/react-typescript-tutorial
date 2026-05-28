import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const moveToCompleted = (selectedTodo: Todo) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== selectedTodo.id)
    );
    setCompletedTodos((currentCompletedTodos) => [
      ...currentCompletedTodos,
      { ...selectedTodo, isDone: true },
    ]);
  };

  const moveToActive = (selectedTodo: Todo) => {
    setCompletedTodos((currentCompletedTodos) =>
      currentCompletedTodos.filter((todo) => todo.id !== selectedTodo.id)
    );
    setTodos((currentTodos) => [
      ...currentTodos,
      { ...selectedTodo, isDone: false },
    ]);
  };

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
                index={index}
                onDone={moveToCompleted}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
                index={index}
                onDone={moveToActive}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
