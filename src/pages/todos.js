import useAuth from "../hooks/useAuth";
import Logout from "../components/Logout";
export default function Todos() {
  const { user, loading } = useAuth();

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
        <p>Todo app will go right here!</p>
      </main>
    </div>
  );
}
