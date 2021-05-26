import Todo from "./Todo";

export default function TodoList({ todoList, handleDelete, user }) {
  return (
    <section>
      <ul>
			{/*if there are todos in the list...*/}
        {todoList.length >= 1
          ? todoList.map((todo, idx) => {
			//map only the user's todos
              return user.email == todo.userEmail ? (
                <Todo key={idx} todo={todo} />
              ) : (
                ""
              );
            })
          : "Enter a todo item"}
      </ul>
    </section>
  );
}