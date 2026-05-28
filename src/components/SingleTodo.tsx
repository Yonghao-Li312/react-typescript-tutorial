import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";
import "./styles.css";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
  onDone: (todo: Todo) => void;
};

const SingleTodo = ({ todo, todos, setTodos, index, onDone }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = () => {
    const trimmedTodo = editTodo.trim();

    onDone({
      ...todo,
      todo: trimmedTodo || todo.todo,
    });
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const saveEdit = (id: number) => {
    if (editTodo.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: editTodo.trim() } : todo
        )
      );
    }

    setEdit(false);
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    saveEdit(id);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                saveEdit(todo.id);
              }
            }}
            className="todos__single--text"
            ref={inputRef}
          />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div className="todos__single--actions">
            <button
              type="button"
              className="icon"
              aria-label="Edit task"
              title="Edit task"
              disabled={todo.isDone}
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </button>

            <button
              type="button"
              className="icon"
              aria-label="Delete task"
              title="Delete task"
              onClick={() => handleDelete(todo.id)}
            >
              <AiFillDelete />
            </button>

            <button
              type="button"
              className="icon"
              aria-label={
                todo.isDone ? "Move task back to active" : "Move task to completed"
              }
              title={
                todo.isDone ? "Move task back to active" : "Move task to completed"
              }
              onClick={handleDone}
            >
              <MdDone />
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
