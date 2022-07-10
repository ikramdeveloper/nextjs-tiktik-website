import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import { NoResults } from "../components";
import { IUser } from "../types";

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  isPostingComment,
  comments,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  const handleChange = (e: any) => setComment(e.target.value);

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-gray-100 border-b-2 lg:pb-0 pb-[100px]">
      {/* Comments section start */}
      <section className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item) => (
            <div key={item._key}>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={user._id}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <figure className="w-8 h-8">
                            <Image
                              src={user.image}
                              alt={user.username}
                              width="34"
                              height="34"
                              layout="responsive"
                              className="rounded-full cursor-pointer"
                            />
                          </figure>

                          <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                            {user.username}{" "}
                            <GoVerified className="text-blue-400" />
                          </p>
                        </div>
                      </Link>

                      <article>
                        <p className="text-base mt-2">{item.comment}</p>
                      </article>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </section>
      {/* Comments section end */}

      {/* New comment section starr */}
      {userProfile && (
        <section className="absolute bottom-0 left-0 pb-6 px-2 md:px-5">
          <form onSubmit={addComment} className="flex gap-3 items-center">
            <input
              type="text"
              value={comment}
              onChange={handleChange}
              placeholder="Add comment..."
              className="bg-primary px-5 py-3 text-md font-medium border-2 w-[250px] md:w-[650px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              type="submit"
              className="text-md text-white rounded px-2 h-12 bg-secondary cursor-pointer hover:scale-105 duration-500"
            >
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </section>
      )}
      {/* New comment section end */}
    </div>
  );
};
export default Comments;
