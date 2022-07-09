import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from "../assets/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const handleLogout = () => {
    googleLogout();
    removeUser();
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <figure className="w-[100px] md:w-[130px]">
          <Image
            src={Logo}
            className="cursor-pointer"
            alt="TikTik"
            layout="responsive"
          />
        </figure>
      </Link>

      <article>Search</article>

      <article>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10 ">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href="">
                <>
                  <Image
                    src={userProfile?.image}
                    alt={userProfile?.username}
                    width="40"
                    height="40"
                    className="rounded-full cursor-pointer"
                  />
                </>
              </Link>
            )}
            <button type="button" className="px-2" onClick={handleLogout}>
              <AiOutlineLogout color="red" fontSize="21" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => {
              console.log("Error");
            }}
          />
        )}
      </article>
    </div>
  );
};
export default Navbar;
