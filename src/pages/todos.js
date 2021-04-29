import { useState, useEffect } from "react";
//we get the datepicker package to play nice with Next by importing the css modules manually
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import client from "../lib/sanity/client";
import TodoList from "../components/TodoList";
import useAuth from "../hooks/useAuth";
import Logout from "../components/Logout";
export default function Home() {
  const { user, loading } = useAuth();
  const [todoList, setTodoList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const fetchTodos = async () => {
    let fetchedTodos;
    if (!loading) {
      fetchedTodos = await client.fetch(
        `*[_type=="todo" && userEmail==$userEmail] | order(dueDate asc){_id, text, createdAt, dueDate, isCompleted, completedAt, userEmail}`,
        {
          userEmail: user.email,
        }
      );
      setTodoList(fetchedTodos);
    }
  };

  useEffect(
    () => {
      fetchTodos();
    },
    //if you wanted to add a dependecy for refresh, refer to this:
    //https://daveceddia.com/useeffect-triggers-every-change/
    [loading, user]
  );
  //event handlers for:
  // typing in the form, pressing submit button, and deleting
  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.length == 0 || dueDate == "") {
      setErrMessage("Todo text and due date must be filled out.");
    } else {
      await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({
          text: userInput,
          dueDate: dueDate,
          user: user.email,
        }),
      });
      fetchTodos();
      setUserInput("");
      setErrMessage("");
      setDueDate("");
    }
  };

  const handleDelete = async (selectedTodo) => {
    await fetch("/api/todo", {
      method: "DELETE",
      body: selectedTodo._id,
    }); //
    fetchTodos();
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <Logout />
      <main className="text-center">
        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight ">My To-do List</h1>
          <p className="mt-4 text-gray-700 text-md">
            {loading ? "Loading..." : `Logged in as ${user.email}`}
          </p>
        </div>
        <form>
          <div className="flex justify-center items-center">
            <input
              className="w-72 h-12 border p-4 border-blue-100"
              type="text"
              value={userInput}
              placeholder="Make coffee."
              onChange={handleChange}
            />
            <div className="my-8">
              <DatePicker
                className="p-4 "
                minDate={new Date()}
                onChange={setDueDate}
                value={dueDate}
              />
            </div>
          </div>{" "}
          <button
            className=" px-6 py-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 font-semibold"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <p>{errMessage}</p>
        </form>
        <div className="my-12">
          <h1 className="text-xl font-bold tracking-tight my-8">Your Todos</h1>
          {loading ? (
            "loading..."
          ) : (
            <TodoList
              user={user}
              todoList={todoList}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
}
