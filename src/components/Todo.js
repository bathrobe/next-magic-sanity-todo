// src/components/Todo.js

import { useState, useContext } from "react";
// import a simple date formatting library
import dayjs from "dayjs";
// import a trashcan icon for our delete button
import { RiDeleteBin5Line } from "react-icons/ri";
import { TodoContext } from "../pages/todos"

export default function Todo({ todo }) {
//with useContext we do not need to pass handleDelete to <TodoList/>
const { handleDelete, fetchTodos } = useContext(TodoContext)
	//setting states for the isCompleted boolean and a date completed
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [completedTime, setCompletedTime] = useState(todo.completedAt);
	
	//function that syncs the completed checkbox with Sanity
  const handleToggle = async (e) => {
    e.preventDefault();
    const result = await fetch("/api/todo", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo._id,
				//passes isCompleted React state to Sanity
        isCompleted: isCompleted,
        completedAt: todo.completedAt,
      }),
    });

    const { status, completedAt } = await result.json();
    await fetchTodos();
		//pass our Sanity results back into React
    setIsCompleted(status);
    setCompletedTime(completedAt);

  };
  return (
    <li
      className="bg-gray-50 my-6 border shadow-md rounded-xl 
			p-4 border-gray-200 flex justify-center items-center"
      key={todo._id}
    >
      <input
        className="mx-2 cursor-pointer"
        type="checkbox"
        checked={todo.isCompleted}
        onChange={handleToggle}
      />
			{/*if todo is done, cross it out and turn it gray*/}
      <p
        className={`text-lg mx-2 ${
          todo.isCompleted ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </p>
      <p className={`text-gray-400 mr-2`}>
				{/*if todo is done, show completedTime
					if not done, show due date */}
        {todo.isCompleted
          ? `Done ${dayjs(completedTime).format("MMM D, YYYY")}`
          : `Due ${dayjs(todo.dueDate).format("MMM D, YYYY")}`}
      </p>
      <button
        className="mx-2"
        onClick={(e) => {
          e.preventDefault();
          handleDelete(todo);
        }}
      >
        <RiDeleteBin5Line />
      </button>
    </li>
  );
}