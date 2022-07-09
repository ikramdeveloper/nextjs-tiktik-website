import { FaCloudUploadAlt } from "react-icons/fa";

interface IProps {
  isLoading: boolean;
  uploadVideo: any;
  videoAsset: any;
  isWrongFileType: boolean;
}

const VideoUpload = ({
  uploadVideo,
  isLoading,
  videoAsset,
  isWrongFileType,
}: IProps) => {
  return (
    <section className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
      {isLoading ? (
        <p>Uploading...</p>
      ) : (
        <div>
          {videoAsset ? (
            <div>
              <video
                src={videoAsset?.url}
                loop
                controls
                className="rounded-xl h-[350px] mt-16 bg-black"
              ></video>
            </div>
          ) : (
            <label className="cursor-pointer">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="flex flex-col justify-center items-center">
                  <p className="font-bold text-xl">
                    <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                  </p>
                  <p className="text-xl font-semibold">Upload Video</p>
                </div>
                <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                  MP4 or WebM or Ogg <br /> 720×1280 or higher <br /> Up to 10
                  minutes <br /> Less than 1GB
                </p>
                <p className="bg-secondary text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                  Select File
                </p>
              </div>

              <input
                type="file"
                name="upload-video"
                className="w-0 h-0"
                onChange={(e) => uploadVideo(e)}
              />
            </label>
          )}
        </div>
      )}
      {isWrongFileType && (
        <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
          Please select valid video file
        </p>
      )}
    </section>
  );
};
export default VideoUpload;
