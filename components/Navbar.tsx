import React, { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const { userProfile, addUser, removeUser }: any = useAuthStore();

  const handleLogout = () => {
    googleLogout();
    removeUser();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm) {
      router.push(`/search/${searchTerm}`);
    }
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

      <article className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search accounts and videos"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-gray-300 w-[350px] rounded-full md:top-0"
          />
          <button
            type="submit"
            className="absolute right-6 md:right-5 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </article>

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
              <Link href={`/profile/${userProfile._id}`}>
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
