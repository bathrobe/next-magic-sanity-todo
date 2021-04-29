import Todo from "./Todo";

export default function TodoList({ todoList, handleDelete, user }) {
  return (
    <section>
      <ul>
        {todoList.length >= 1
          ? todoList.map((todo, idx) => {
              return user.email == todo.userEmail ? (
                <Todo key={idx} todo={todo} handleDelete={handleDelete} />
              ) : (
                ""
              );
            })
          : "Enter a todo item"}
      </ul>
    </section>
  );
}
