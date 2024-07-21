import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { autheticate, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

const HeaderUser = async () => {
  let isLoggedIn = await autheticate();

  return (
    <div className="flex items-center justify-center">
      {isLoggedIn ? (
        <>
          <h2 className="mr-2 font-[500] underline underline-offset-2">
            {isLoggedIn?.username}
          </h2>
          <form
            action={async () => {
              "use server";
              await logout();
              redirect("/auth/signin");
            }}
          >
            <button type="submit">
              <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.1] cursor-pointer relative">
                <IoLogOutOutline className="text-[15px] md:text-[30px]" />
              </div>
            </button>
          </form>
        </>
      ) : (
        <Link href="/auth/signin">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.1] cursor-pointer relative">
            <FaUserLarge className="text-[15px] md:text-[30px]" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default HeaderUser;
