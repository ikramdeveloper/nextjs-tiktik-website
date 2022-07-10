import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import { SanityAssetDocument } from "@sanity/client";

import { client } from "../utils/client";
import { VideoUpload, VideoForm } from "../components";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [isWrongFileType, setIsWrongFileType] = useState(false);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setIsLoading(true);
      setIsWrongFileType(false);

      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsWrongFileType(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full absolute left-0 top-[60px] mb-2 pt-6 lg:pt-20 bg-gray-200 justify-center">
      <div className="bg-white rounded-lg w-3/5 mb-8 flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <article>
            <p className="text-2xl font-bold">Upload video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </article>

          <VideoUpload
            uploadVideo={uploadVideo}
            isLoading={isLoading}
            videoAsset={videoAsset}
            isWrongFileType={isWrongFileType}
          />
        </div>

        <VideoForm videoAsset={videoAsset} setVideoAsset={setVideoAsset} />
      </div>
    </div>
  );
};
export default Upload;
