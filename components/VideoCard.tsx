import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import { IVideo } from "../types";

interface IProps {
  post: IVideo;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlaying = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  const handleMuted = () => {
    if (videoRef.current) {
      if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      } else {
        setIsMuted(true);
        videoRef.current.muted = true;
      }
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <section className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
        <Link href={`/profile/${post.postedBy._id}`}>
          <figure className="md:w-16 md:h-16 w-10 h-10">
            <Image
              src={post.postedBy.image}
              alt="profile"
              layout="responsive"
              width={62}
              height={62}
              className="rounded-full"
            />
          </figure>
        </Link>

        <Link href={`/profile/${post.postedBy._id}`}>
          <article className="flex flex-col gap-2">
            <p className="flex gap-2 items-center md:text-md font-bold text-primary">
              {post.postedBy.username}{" "}
              <GoVerified className="text-blue-400 text-md" />
            </p>

            <p className="text-xs capitalize font-medium text-gray-500 hidden md:block">
              {post.postedBy.username}
            </p>
          </article>
        </Link>
      </section>

      <section className="lg:ml-20 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              src={post.video.asset.url}
              loop
              ref={videoRef}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-900"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-12 p-3">
              <button onClick={handlePlaying}>
                {isPlaying ? (
                  <BsFillPauseFill className="text-white text-2xl lg:text-4xl" />
                ) : (
                  <BsFillPlayFill className="text-white text-2xl lg:text-4xl" />
                )}
              </button>

              <button onClick={handleMuted}>
                {isMuted ? (
                  <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                ) : (
                  <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default VideoCard;
