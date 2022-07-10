import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

import { IVideo, IUser } from "../../types";
import { NoResults, VideoCard } from "../../components";
import useAuthStore from "../../store/authStore";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IProps {
  videos: IVideo[];
}

const Search = ({ videos }: IProps) => {
  const [showVideos, setShowVideos] = useState(true);

  const { allUsers } = useAuthStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;

  const isVideos = showVideos ? "border-b-2 border-black" : "text-gray-400";
  const isAccounts = !showVideos ? "border-b-2 border-black" : "text-gray-400";

  const filteredAccounts = allUsers.filter((user: IUser) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <article className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setShowVideos(true)}
        >
          Videos
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts}`}
          onClick={() => setShowVideos(false)}
        >
          Accounts
        </p>
      </article>

      {showVideos ? (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos?.length ? (
            videos.map((video) => <VideoCard post={video} key={video._id} />)
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="mt-2">
          {filteredAccounts.length ? (
            filteredAccounts.map((account: IUser) => (
              <Link href={`/profile/${account._id}`} key={account._id}>
                <div className="flex gap-3 p-2 font-semibold rounded border-b-2 border-gray-200">
                  <figure>
                    <Image
                      src={account.image}
                      alt={account.username}
                      width={50}
                      height={50}
                      className="rounded-full cursor-pointer"
                    />
                  </figure>

                  <article>
                    <p className="flex gap-1 items-center text-lg font-bold text-primary">
                      {account.username}{" "}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-sm">
                      {account.username}
                    </p>
                  </article>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No account results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: data,
    },
  };
};
export default Search;
