import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { removeCookie } from "../lib/cookie";
export default function Logout() {
  const router = useRouter();
  const logoutUser = async () => {
    const m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY);

    try {
      await m.user.logout();
      console.log(await m.user.isLoggedIn());
      router.push("/");
    } catch {
      (err) => console.error(err);
    }
  };
  return (
    <div className="flex justify-end items-center">
      <button
        className="focus:outline-none focus:ring focus:border-blue-800 bg-gray-100 my-2 px-6 py-2 rounded-xl border-2 border-blue-800 text-blue-900 hover:bg-blue-800 hover:text-blue-50 font-semibold"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
}
