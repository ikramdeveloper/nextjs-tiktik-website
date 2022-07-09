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

  const handleMuted = () => setIsMuted((prev) => !prev);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <section>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="">
              <>
                <Image
                  src={post.postedBy.image}
                  alt="profile"
                  layout="responsive"
                  width="62"
                  height="62"
                  className="rounded-full"
                />
              </>
            </Link>
          </div>

          <div>
            <Link href="">
              <article className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.username}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>

                <p className="text-xs capitalize font-medium text-gray-500 hidden md:block">
                  {post.postedBy.username}
                </p>
              </article>
            </Link>
          </div>
        </div>
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
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-12 p-3">
              {isPlaying ? (
                <button onClick={handlePlaying}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={handlePlaying}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}

              {isMuted ? (
                <button onClick={handleMuted}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={handleMuted}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default VideoCard;
