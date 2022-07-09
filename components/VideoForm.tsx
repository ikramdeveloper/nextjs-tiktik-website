import { useState } from "react";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";
import useAuthStore from "../store/authStore";
import axios from "axios";

const VideoForm = ({ videoAsset }: { videoAsset: any }) => {
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [isSavingPost, setIsSavingPost] = useState(false);

  const router = useRouter();

  const { userProfile }: { userProfile: any } = useAuthStore();

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setIsSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`process.env.NEXT_PUBLIC_BASE_URL/api/post`, document);

      router.push("/");
    }
  };

  const handleDiscard = () => {};

  return (
    <section className="flex flex-col gap-3 pb-10">
      <label htmlFor="caption" className="text-md font-medium">
        Caption
      </label>
      <input
        type="text"
        id="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="rounded outline-none text-md border-2 border-gray-200 p-2"
      />
      <label htmlFor="category" className="text-md font-medium">
        Choose a category
      </label>
      <select
        id="category"
        onChange={(e) => setCategory(e.target.value)}
        className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
      >
        {topics.map((item) => (
          <option
            key={item.name}
            value={item.name}
            className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
          >
            {item.name}
          </option>
        ))}
      </select>
      <div className="flex gap-6 mt-10 ">
        <button
          type="button"
          onClick={handleDiscard}
          className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:scale-105 duration-500"
        >
          Discard
        </button>

        <button
          type="button"
          onClick={handlePost}
          className="bg-secondary text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:scale-105 duration-500"
        >
          Post
        </button>
      </div>
    </section>
  );
};
export default VideoForm;
