import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Read from "./Read";
// import "react-toastify/dist/ReactToastify.css";

const Create = (props) => {
  const todos = props.todos;
  const settodos = props.settodos;
  const [showPending, setShowPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function submitHandler(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newTodos = {
      Id: nanoid(),
      Name: data.title,
      important: data.complete,
    };
    settodos((prevTodos) => [...prevTodos, newTodos]);
    reset();

    toast.success("Task added successfully!");

  }

  return (
    <>
      <div className="bg-gray-900 w-screen h-screen flex flex-col justify-center items-center gap-20 p-15 relative">
        {/* Corner Brackets */}
        <div className="absolute top-20 left-20 w-12 h-12 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-20 right-20 w-12 h-12 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 border-b-2 border-r-2 border-cyan-400"></div>

        {showPending ? (
          <Read todos={todos} settodos={settodos} setShowPending={setShowPending} />
        ) : (
          <>
            {/* Main Dashed Border */}
            <div className="border-2 border-dashed border-cyan-400 px-20 py-16 max-w-4xl">
              <h1 className="text-8xl font-bold text-center text-cyan-400">
                ToDo List <br /> <span className="text-cyan-300">Application</span>
              </h1>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-2xl px-8">
              <p className="text-lg font-semibold text-white">Your Task</p>
              <input
                placeholder="Enter Task Name"
                className="propercase border-2 border-cyan-400 rounded-md p-2 w-full h-15 text-3xl text-cyan-400 bg-gray-800 placeholder-cyan-600 focus:outline-none focus:border-cyan-300"
                {...register("title", { setValueAs: (v) => v.toUpperCase(),
                  required: "Task name is required",
                  minLength: {
                    value: 3,
                    message: "Task name must be at least 3 characters long",
                  },
                  maxLength: {
                    value: 25,
                    message: "Task name must be at most 15 characters long",
                  },
                  caseSensitive: {
                    value: true,
                    message: "Task name must be case sensitive",
                  },
                  pattern: {
                    value: /^[A-Za-z]+/i,
                    message: "Task name must contain only letters",
                  },
                })}
                type="text"
              />
              <p className="text-red-400">{errors?.title?.message}</p>

              <br />

              <label className="flex items-center gap-2 mt-2 p-2 text-white">
                Mark for Important
                <input type="checkbox" {...register("complete")} className="accent-cyan-400" />
              </label>

              <div className="flex gap-4">
                <input
                  type="submit"
                  disabled={isSubmitting}
                  value={isSubmitting ? "Please Wait..." : "Save Task"}
                  className="bg-cyan-500 text-gray-900 px-6 py-3 rounded-md mt-4 font-semibold
                   disabled:bg-gray-600
                   hover:bg-cyan-400
                   transition-all duration-200 flex-1 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setShowPending(true)}
                  className="bg-cyan-600 text-gray-900 px-6 py-3 rounded-md mt-4 font-semibold hover:bg-cyan-500 transition-all duration-200"
                >
                  Show Pending Tasks
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Create;
