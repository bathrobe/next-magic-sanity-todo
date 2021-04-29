// pages/login.js
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.target;

    // the Magic code
    const did = await new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUB_KEY
    ).auth.loginWithMagicLink({ email: elements.email.value });

    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      // We successfully logged in, our API
      // set authorization cookies and now we
      // can redirect to the dashboard!
      router.push("/todos");
    } else {
      /* handle errors */
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold tracking-tight my-8">
        Log in to Sanity-Next Todo
      </h1>
      <form className="mt-12 max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <label
          className="block mb-2 uppercase text-gray-700 font-semibold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="px-4 py-2 mb-6 text-blue-700 border-2 w-72 border-blue-500 outline-none focus:bg-gray-300"
          name="email"
          type="email"
        />
        <br />
        <div className="flex justify-center items-center">
          <button className="px-6 py-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 font-semibold">
            Log in
          </button>
        </div>
      </form>
    </main>
  );
}
