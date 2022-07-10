import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import { VideoCard, NoResults } from "../../components";
import { IUser, IVideo } from "../../types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface IProps {
  data: {
    user: IUser;
    createdPosts: IVideo[];
    likedPosts: IVideo[];
  };
}

const ProfilePage = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<IVideo[]>([]);

  const { user, createdPosts, likedPosts } = data;
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    const fetchVideos = () => {
      if (showUserVideos) {
        setVideosList(createdPosts);
      } else {
        setVideosList(likedPosts);
      }
    };

    fetchVideos();
  }, [showUserVideos, likedPosts, createdPosts]);

  return (
    <div className="w-full">
      <section className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <figure className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            alt={user.username}
            width={120}
            height={120}
            layout="responsive"
            className="rounded-full"
          />
        </figure>

        <article>
          <p className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
            <span>{user.username.replaceAll(/\s+/g, "")} </span>
            <GoVerified className="text-blue-400 md:text-xl text-md" />
          </p>
          <p className="text-sm font-medium capitalize">{user.username}</p>
        </article>
      </section>

      <section>
        <article className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </article>

        <article className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((video: IVideo) => (
              <VideoCard key={video._id} post={video} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </article>
      </section>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  return {
    props: {
      data,
    },
  };
};
export default ProfilePage;
