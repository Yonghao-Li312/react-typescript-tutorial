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

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

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

  return <div className="App">
    <span className="heading">Taskify</span>
    <DragDropContext onDragEnd={onDragEnd}>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos}
      />
    </DragDropContext>
  </div>;
};

export default App;


/* let name: string;
let age: number | string; // it's called Union, means age can be either string or number
let isStudent: boolean;
let hobbies: string[];
let role: [number, string]; //tuple

let printName: (name: String) => never; //function



// type Person = {
//   name: string;
//   age?: number;  //表明age元素可以省略
// };

// let person: Person = {
//   name: "23432",
// };

// let lotsOfPeople: Person[];

let personName: unknown; //when you don't know the type

interface Person {
  name: string;
  age?: number;
};

interface Guy extends Person {
  profession: string;
};

type X = {
  a: string;
  b: number;
};

type Y = {
  c: string;
  d: number;
};

let y: Y = {
  c: "efdas",
  d: 42,
};

function App() {
  return (
    <div className="App">
        Hello World
    </div>
  );
}

export default App; */
