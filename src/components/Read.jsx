// import React from "react";
// import style from "./Read.module.css";
// import { useState, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Read = (props) => {
  const todos = props.todos;
  const settodos = props.settodos;
  const styforBtn = props.styforBtn;
  const setShowPending = props.setShowPending;

  const [deletedTask, setDeletedTask] = useState(null);

  // const [check, setcheck] = useState(false);
  

  const deleteHandler = (Id) => {
    console.log(Id);

    const taskToDelete = todos.find((todo) => todo.Id === Id);
    setDeletedTask({ task: taskToDelete, index: todos.findIndex((todo) => todo.Id === Id) });

    const filterdtodos = todos.filter((todo) => todo.Id != Id);
    console.log(filterdtodos);
    settodos(filterdtodos);

    toast.error("Task deleted successfully!", {
      action: {
        label: "Undo",
        onClick: undoDelete
      },
      autoClose: 5000
    });

    // Clear the deleted task after 5 seconds
    setTimeout(() => {
      setDeletedTask(null);
    }, 5000);
  };

  const textthrought = (Id) => {
    const updatedTodos = todos.map((todo) =>
      todo.Id === Id ? { ...todo, checked: !todo.checked } : todo,
    );
    settodos(updatedTodos);

    const todo = todos.find(t => t.Id === Id);
    if (!todo.checked) {
      toast.info("Task Completed!");
    }
  };

  const undoDelete = () => {
    if (deletedTask) {
      const restoredTask = { ...deletedTask.task, checked: false };
      settodos((prev) => [restoredTask, ...prev]);
      setDeletedTask(null);
      toast.success("Task restored!");
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.checked && !b.checked) return 1;
    if (!a.checked && b.checked) return -1;
    return 0;
  });

  const rendertodo = sortedTodos.map((todo) => {
    return (
      <li
        className={`w-full my-2 rounded-lg flex items-center justify-between px-4 py-3 ${
          todo.important
            ? "bg-cyan-600 border-2 border-cyan-400"
            : "bg-gray-800 border border-cyan-400"
        }`}
        key={todo.Id}
      >
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex gap-3 align-middle text-2xl">
            <input
              className="scale-150 accent-cyan-400"
              type="checkbox"
              checked={todo.checked || false}
              onChange={() => textthrought(todo.Id)}
            />

            <span className={todo.checked ? "line-through text-gray-400" : "text-white"}>
              {todo.Name}
            </span>
          </div>
          <div>
            <button
              disabled={!todo.checked}
              onClick={() => deleteHandler(todo.Id)}
              className={`text-lg px-3 py-1 rounded-lg transition-all duration-200
    ${
      todo.checked
        ? "bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95 active:bg-red-700"
        : "bg-gray-600 text-gray-300 opacity-50 cursor-not-allowed"
    }
      `}
            >
              delete
            </button>
          </div>
        </div>
      </li>
    );
  });

  const ClearAll = () => {
    settodos([]);
  };
if (todos.length === 0) {
    return (
      <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center gap-20 p-15 relative">
        <div className="absolute top-20 left-20 w-12 h-12 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-20 right-20 w-12 h-12 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 border-b-2 border-r-2 border-cyan-400"></div>

        <div className="border-2 border-dashed border-cyan-400 px-20 py-16 max-w-4xl">
          <h1 className="text-6xl font-bold text-center text-cyan-400">
            Pending Tasks
          </h1>
        </div>
        
        <p className="text-2xl text-gray-500 font-light">No tasks available yet. Add a task to get started!</p>
        
        <button
          onClick={() => setShowPending(false)}
          className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-cyan-400 transition-all duration-200 mt-8"
        >
          ← Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center gap-5 p-15 relative">
      <div className="absolute top-20 left-20 w-12 h-12 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute top-20 right-20 w-12 h-12 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 border-b-2 border-r-2 border-cyan-400"></div>

      <div className="border-2 border-dashed border-cyan-400 px-20 py-16 max-w-4xl">
        <h1 className="text-6xl font-bold text-center text-cyan-400">
          Pending Tasks
        </h1>
      </div>

      <div className="w-full max-w-4xl border-2 border-dashed border-cyan-400 px-8 py-6 rounded-lg">
        <ol className="p-4 overflow-y-auto max-h-96 space-y-2">{rendertodo}</ol>

{todos.length > 1 && (
  <button
    className="w-full bg-red-600 text-white p-2 rounded-lg mt-4 font-semibold hover:bg-red-700 transition-all duration-200"
    onClick={ClearAll}
  >
    Clear All Tasks
  </button>
)}
      </div>

      <button
        onClick={() => setShowPending(false)}
        className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-cyan-400 transition-all duration-200 mt-8"
      >
        ← Back to Form
      </button>
    </div>
  );
};

export default Read;
