// pages/index.js

import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold tracking-tight my-8">
        Sanity-Next.js Todo App Starter
      </h1>
      <br />
      <div>
        <p>
          This tutorial starter comes pre-built with{" "}
          <a
            className="text-blue-800 font-semibold hover:underline"
            href="https://magic.link"
          >
            Magic.link
          </a>{" "}
          for authentication. Aside from the{" "}
          <span>
            <code>{"<Logout/>"}</code>
          </span>{" "}
          component, the auth code is all taken from{" "}
          <a
            className="text-blue-800 font-semibold hover:underline"
            href="https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs"
          >
            "Simple Auth with Magic.link and Next.js"
          </a>{" "}
          by Eric Adamski at Vercel.
        </p>
        <p className="pt-2">
          There's a Sanity client config in <code>lib/sanity/client.js</code>{" "}
          and{" "}
          <a
            href="https://tailwindcss.com/"
            className="text-blue-800 font-semibold hover:underline"
          >
            Tailwind
          </a>{" "}
          is installed for styling.
          <div className="flex justify-center items-center mt-12">
            {" "}
            <Link href="/login">
              <a className="focus:outline-none focus:ring focus:border-blue-800 px-6 py-2 rounded-xl bg-blue-500 text-blue-50 hover:bg-blue-800 font-semibold">
                Go to Login
              </a>
            </Link>
          </div>
        </p>
      </div>
    </main>
  );
}
