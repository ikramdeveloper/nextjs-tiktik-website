import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import useAuthStore from "../../store/authStore";

import { IVideo } from "../../types";
import { Comments, LikeButton } from "../../components";

interface IProps {
  postDetails: IVideo;
}

const VideoDetail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");

  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);

  const { userProfile }: any = useAuthStore();

  const handlePlaying = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
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

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/like`,
        {
          userId: userProfile._id,
          postId: post._id,
          like,
        }
      );

      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`,
        {
          userId: userProfile._id,
          comment,
        }
      );

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (!post) return <p>No post exists</p>;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <article className="absolute top-2 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer " onClick={() => router.push("/")}>
            <MdOutlineCancel className="text-white text-4xl" />
          </p>
        </article>

        <article className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              ref={videoRef}
              loop
              onClick={handlePlaying}
              className="h-full cursor-pointer "
            ></video>
          </div>

          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!isPlaying && (
              <button onClick={handlePlaying}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl " />
              </button>
            )}
          </div>
        </article>

        <article className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isMuted ? (
            <button onClick={handleMuted}>
              <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={handleMuted}>
              <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
            </button>
          )}
        </article>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="lg:mt-20 mt-10">
          <Link href={`/profile/${post.postedBy._id}`}>
            <section className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
              <figure className="md:w-20 md:h-20 w-16 h-16 ml-4">
                <Image
                  src={post.postedBy.image}
                  alt="profile"
                  layout="responsive"
                  width={62}
                  height={62}
                  className="rounded-full"
                />
              </figure>

              <article className="flex flex-col gap-2 mt-3">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.username}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>

                <p className="text-xs capitalize font-medium text-gray-500 hidden md:block">
                  {post.postedBy.username}
                </p>
              </article>
            </section>
          </Link>

          <p className="px-5 md:pl-10 text-xl font-bold text-gray-600 mt-4">
            {post.caption}
          </p>

          <article className="mt-6 px-10">
            {userProfile && (
              <LikeButton handleLike={handleLike} likes={post.likes} />
            )}
          </article>

          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
            comments={post.comments}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { postId },
}: {
  params: { postId: string };
}) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${postId}`
  );

  return {
    props: {
      postDetails: data,
    },
  };
};
export default VideoDetail;
