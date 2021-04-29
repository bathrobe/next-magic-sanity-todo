import { useState, useEffect } from "react";
import dayjs from "dayjs";
import client from "../lib/sanity/client";
import { RiDeleteBin5Line } from "react-icons/ri";
export default function Todo({ todo, handleDelete }) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [completedTime, setCompletedTime] = useState(todo.completedAt);

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
        isCompleted: isCompleted,
        completedAt: todo.completedAt,
      }),
    });

    const { status, completedAt } = await result.json();
    setIsCompleted(status);
    setCompletedTime(completedAt);
  };
  return (
    <li
      className="bg-gray-50 my-6 border rounded-xl p-4 border-gray-200 flex justify-center items-center"
      key={todo._id}
    >
      <input
        className="mx-2 cursor-pointer"
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
      />
      <p
        className={`text-lg mx-2 ${
          isCompleted ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </p>
      <p className={`text-gray-400 mr-2`}>
        {isCompleted
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
