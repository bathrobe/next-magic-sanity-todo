import { useState, useEffect, createContext } from "react";
//we must import the datepicker's css modules manually
//so it plays nice with Next.
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import useAuth from "../hooks/useAuth";
import Logout from "../components/Logout";
import client from "../lib/sanity/client";
import TodoList from "../components/TodoList"

export const TodoContext = createContext()

export default function Todos() {
  const { user, loading } = useAuth();
  const [todoList, setTodoList] = useState([]);
  //create a state for the text in the todo input form
  const [userInput, setUserInput] = useState("");
  //create a state for the due date chosen in the datepicker
  const [dueDate, setDueDate] = useState("");
  //set an error message if either input is missing
  const [errMessage, setErrMessage] = useState("");

//after the useState hooks
const fetchTodos = async () => {
  let fetchedTodos;
  //make sure the user is loaded
  if (!loading) {
    //pass userEmail as a query parameter
    fetchedTodos = await client.fetch(
			`*[_type=="todo" && userEmail==$userEmail] | order(dueDate asc)
				{_id, text, createdAt, dueDate, isCompleted, completedAt, userEmail}`,
        {
          userEmail: user.email,
        });
    //insert our response in the todoList state
    setTodoList(fetchedTodos);
  }
};

useEffect(
  () => {
    //now it will fetch todos on page load...
    fetchTodos();
  },
  //this dependecy array tells React to run the
  //hook again whenever loading or user values change
  [loading, user]
);

  //FOR THE INPUT FORM:
const handleChange = (e) => {
  e.preventDefault();
  setUserInput(e.target.value);
};

//FOR THE SUBMIT BUTTON:
const handleSubmit = async (e) => {
  e.preventDefault();
  //if either part of the form isn't filled out
  //set an error message and exit
  if (userInput.length == 0 || dueDate == "") {
    setErrMessage("Todo text and due date must be filled out.");
  } else {
    //otherwise send the todo to our api
    // (we'll make this next!)
    await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({
        text: userInput,
        dueDate: dueDate,
        user: user.email,
      }),
    });
    await fetchTodos();
    // Clear all inputs after the todo is sent to Sanity
    setUserInput("");
    setErrMessage("");
    setDueDate("");
  }
};
const handleDelete = async (selectedTodo) => {
  await fetch("/api/todo", {
    method: "DELETE",
    body: selectedTodo._id,
  });
  //todos will refresh after delete, too
  fetchTodos();
};

console.log(todoList)

  return (
    <TodoContext.Provider value={{handleDelete, fetchTodos}}>
      {/* all your rendered JSX */}
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
					{/*we flex the text input and datepicker
					so they display inline. */}
          <div className="flex justify-center items-center">
            <input
              className="w-72 h-12 border p-4 border-blue-100"
              type="text"
              value={userInput}
              placeholder="Make coffee."
              // our function
              onChange={handleChange}
            />
            <div className="my-8">
              <DatePicker
                className="p-4"
                minDate={new Date()}
                onChange={setDueDate}
                value={dueDate}
              />
            </div>
          </div>{" "}
          <button
            className="focus:outline-none focus:ring focus:border-blue-800
						px-6 py-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 
						font-semibold"
            onClick={handleSubmit}
          >
            Submit
          </button>
					{/*error set in handleSubmit*/}
          <p>{errMessage}</p>
        </form>
        <div className="my-12">
          <h1 className="text-xl font-bold tracking-tight 
					my-8">Your Todos</h1>
          {loading ? (
            "loading..."
          ) : (
            <TodoList
              user={user}
              todoList={todoList}
            />
          )}
        </div>
      </main>
    </div>
    </TodoContext.Provider>
  );
}
