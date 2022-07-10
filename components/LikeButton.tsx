import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "../store/authStore";

interface IProps {
  handleLike: (like: boolean) => void;
  likes: any[];
}

const LikeButton = ({ handleLike, likes }: IProps) => {
  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  const filteredLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filteredLikes?.length > 0) {
      setIsAlreadyLiked(true);
    } else setIsAlreadyLiked(false);
  }, [likes, filteredLikes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {isAlreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-secondary"
            onClick={() => handleLike(false)}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={() => handleLike(true)}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};
export default LikeButton;
