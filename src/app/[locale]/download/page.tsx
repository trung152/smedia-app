"use client";

import { useSocialAutoLink } from "@/context/SocialAutoLinkContext";
import { useRouter } from "next/navigation";
import useDownloader from "react-use-downloader";
import { Image, Modal } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useTranslations } from "next-intl";

function page() {
  const { download } = useDownloader();
  const [openModalVideo, setOpenModalVideo] = useState(false);
  const { socialAutoLinkData: mediaData } = useSocialAutoLink();
  const t = useTranslations();
  const router = useRouter();
  /*   const mediaData = {
    url: "https://vt.tiktok.com/ZSYxeXrqY/",
    source: "tiktok",
    author: "Vb",
    title:
      "nhìn vào đôi mắt của nhau, đừng lừa dối nhau#xu#canhdepthiennhien #chill⛰️",
    thumbnail:
      "https://p16-sign-sg.tiktokcdn.com/aweme/300x400/tos-alisg-p-0037/oMeZpIGjRwGfnevIZRLdJQqkGwfWgAF8I4CAuA.webp?lk3s=d05b14bd&nonce=63916&refresh_token=18eecb575738068cee4019e2aaede7f8&x-expires=1721354400&x-signature=tp%2BSF%2FsKfV3HKSFTLQqGtrrtRKQ%3D&s=AWEME_DETAIL&se=false&sh=&sc=cover&l=20240718025349FC3FB20E95103E075364&shp=d05b14bd&shcp=-",
    duration: 18669,
    medias: [
      {
        url: "https://v16e.tiktokcdn.com/a49e0e2b093a47bbb1799dce9e81bd84/6698d830/video/tos/alisg/tos-alisg-pve-0037c001/oIeJAcrjIZLDQAIBRTkLXRAGF0HYfIGedeAAgG/?a=1340&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=3070&bt=1535&cs=2&ds=3&ft=arF-uqI3mDUPD12tjLz73wUFDPfRaeF~O5&mime_type=video_mp4&qs=14&rc=ZWQzODw5NjhkZDM7PDRkNUBpM2g6c3k5cjw3czMzODczNEBeNC8wMWMuXjExMjBgYDMyYSMzMWEyMmQ0NHNgLS1kMS1zcw%3D%3D&vvpl=1&l=20240718025349FC3FB20E95103E075364&btag=e00088000",
        quality: "hd_no_watermark",
        extension: "mp4",
        type: "video",
      },
      {
        url: "https://v16e.tiktokcdn.com/4615361c1f6bae150cdd07d61991aaa6/6698d830/video/tos/alisg/tos-alisg-pve-0037c001/o8eZtkGjRLGfTebI2RLdJQqkGYPLIAFeIcgAXA/?a=1340&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=6874&bt=3437&cs=0&ds=6&ft=arF-uqI3mDUPD12tjLz73wUFDPfRaeF~O5&mime_type=video_mp4&qs=0&rc=O2loZDo1O2c6ZDlpOmc1OkBpM2g6c3k5cjw3czMzODczNEA2Ly1eLTM1XzExMzJfNjMuYSMzMWEyMmQ0NHNgLS1kMS1zcw%3D%3D&vvpl=1&l=20240718025349FC3FB20E95103E075364&btag=e00088000",
        quality: "no_watermark",
        extension: "mp4",
        type: "video",
      },
      {
        url: "https://v16e.tiktokcdn.com/554db8fc041a5fcdce83fd8b0310ba57/6698d830/video/tos/alisg/tos-alisg-pve-0037c001/oUFLAScfPLrOXRIgQZIGeeeYIv4jAdTLGA9JkG/?a=1340&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=6470&bt=3235&cs=0&ds=3&ft=arF-uqI3mDUPD12tjLz73wUFDPfRaeF~O5&mime_type=video_mp4&qs=0&rc=OjY4PGk5N2loOjU8Z2g6OUBpM2g6c3k5cjw3czMzODczNEAtNl5gLzQ1XzQxNWNhLmIyYSMzMWEyMmQ0NHNgLS1kMS1zcw%3D%3D&vvpl=1&l=20240718025349FC3FB20E95103E075364&btag=e00088000",
        quality: "watermark",
        extension: "mp4",
        type: "video",
      },
      {
        url: "https://sf16-ies-music.tiktokcdn.com/obj/ies-music-aiso/7087431100099791642.mp3",
        duration: 58,
        quality: "audio",
        extension: "mp3",
        type: "audio",
      },
    ],
    type: "multiple",
    error: false,
  }; */
  //   console.log("🚀 ~ page ~ socialAutoLinkData:", mediaData);
  // const mediaData = {
  //   url: "https://vt.tiktok.com/ZSYxeXrqY/",
  //   source: "tiktok",
  //   author: "Vb",
  //   title:
  //     "nhìn vào đôi mắt của nhau, đừng lừa dối nhau#xu#canhdepthiennhien #chill⛰️",
  //   thumbnail:
  //     "https://p16-sign-sg.tiktokcdn.com/aweme/300x400/tos-alisg-p-0037/oMeZpIGjRwGfnevIZRLdJQqkGwfWgAF8I4CAuA.webp?lk3s=d05b14bd&nonce=58886&refresh_token=2acb18be11d836f69dc3c5a1195952bd&x-expires=1720494000&x-signature=sZQuH7a0P1YxpIIfrhZopoALDXY%3D&s=AWEME_DETAIL&se=false&sh=&sc=cover&l=20240708033452E0F743CE7EF4B29BA3CF&shp=d05b14bd&shcp=-",
  //   duration: 18669,
  //   medias: [
  //     {
  //       url: "https://v16e.tiktokcdn.com/8c5161191c813c8176f66f48f661c87f/668bb2cf/video/tos/alisg/tos-alisg-pve-0037c001/oIeJAcrjIZLDQAIBRTkLXRAGF0HYfIGedeAAgG/?a=1340&bti=OTg7QGo5QHM6OjZALTAzYCMvcCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=3070&bt=1535&cs=2&ds=3&ft=arF-uqI3mDUPD12DVWs73wUFDPfRaeF~O5&mime_type=video_mp4&qs=14&rc=ZWQzODw5NjhkZDM7PDRkNUBpM2g6c3k5cjw3czMzODczNEBeNC8wMWMuXjExMjBgYDMyYSMzMWEyMmQ0NHNgLS1kMS1zcw%3D%3D&vvpl=1&l=20240708033452E0F743CE7EF4B29BA3CF&btag=e00088000",
  //       quality: "hd_no_watermark",
  //       extension: "mp4",
  //       type: "video",
  //     },
  //     {
  //       url: "https://v16e.tiktokcdn.com/aa18790dfedf445fbbb26daac5732be5/668bb2cf/video/tos/alisg/tos-alisg-pve-0037c001/o8eZtkGjRLGfTebI2RLdJQqkGYPLIAFeIcgAXA/?a=1340&bti=OTg7QGo5QHM6OjZALTAzYCMvcCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=6874&bt=3437&cs=0&ds=6&ft=arF-uqI3mDUPD12DVWs73wUFDPfRaeF~O5&mime_type=video_mp4&qs=0&rc=O2loZDo1O2c6ZDlpOmc1OkBpM2g6c3k5cjw3czMzODczNEA2Ly1eLTM1XzExMzJfNjMuYSMzMWEyMmQ0NHNgLS1kMS1zcw%3D%3D&vvpl=1&l=20240708033452E0F743CE7EF4B29BA3CF&btag=e00088000",
  //       quality: "no_watermark",
  //       extension: "mp4",
  //       type: "video",
  //     },
  //     {
  //       url: "https://v16e.tiktokcdn.com/9d1b2f0543887f397faf408e10af38f8/668bb2cf/video/tos/alisg/tos-alisg-pve-0037c001/oUFLAScfPLrOXRIgQZIGeeeYIv4jAdTLGA9JkG/?a=1340&bti=OTg7QGo5QHM6OjZALTAzYCMvcCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=6470&bt=3235&cs=0&ds=3&ft=arF-uqI3mDUPD12DVWs73wUFDPfRaeF~O5&mime_type=video_mp4&qs=0&rc=OjY4PGk5N2loOjU8Z2g6OUBpM2g6c3k5cjw3czMzODczNEAtNl5gLzQ1XzQxNWNhLmIyYSMzMWEyMmQ0NHNgLS1kMS1zcw%3D%3D&vvpl=1&l=20240708033452E0F743CE7EF4B29BA3CF&btag=e00088000",
  //       quality: "watermark",
  //       extension: "mp4",
  //       type: "video",
  //     },
  //     {
  //       url: "https://sf16-ies-music.tiktokcdn.com/obj/ies-music-aiso/7087431100099791642.mp3",
  //       duration: 58,
  //       quality: "audio",
  //       extension: "mp3",
  //       type: "audio",
  //     },
  //   ],
  //   type: "multiple",
  //   error: false,
  // };
  useEffect(() => {
    if (!mediaData || mediaData?.error) {
      router.push(`/`);
    }
  }, [mediaData, router]);

  const mediaNotImage = mediaData?.medias?.filter((item: any) => {
    return item?.type !== "image";
  });

  const mediaImage = mediaData?.medias?.filter((item: any) => {
    return item?.type === "image";
  });

  const hasVideo = mediaData?.medias?.find((item: any) => {
    return item?.type === "video";
  });

  console.log("🚀 ~ hasVideo ~ hasVideo:", hasVideo);
  const handleDownload = (url: string, filename: string, type: string, quality: string) => {
    const newUrl = url;

    if (window?.flutter_inappwebview) {
      window.flutter_inappwebview
        .callHandler("onDownload", newUrl, filename, type)
        .then(function (response: any) {
          // console.log("Phản hồi từ Flutter: " + response);
          // toast.success();
        });

        if(quality){
          const checkquality = quality.includes('720') || quality.includes('1080') || quality.includes('hd');
          if(checkquality && type === 'video'){
            window.flutter_inappwebview
            .callHandler("downVideo", quality)
            .then(function (response: any) {
              console.log("Phân hồi này Flutter: " + response);
              // toast.success();
            });
          }
        }
    } else {
      download(newUrl, filename);
    }
  };

  const handleOpenVideo = () => {
    setOpenModalVideo(true);
  };

  const handleCloseVideo = () => {
    setOpenModalVideo(false);
  };

  const handleDownloadAllImg = () => {
    if (!mediaImage) return;
    mediaImage.forEach((item: any, index: number) => {
      const nameImg = `${item?.type}_${new Date().getTime()}_${index + 1}.${
        item?.extension
      }`;
      item?.url &&
        download(`https://api.zm.io.vn/download/?url=${item?.url}`, nameImg);
    });
  };

  const getClassNameByType = (item: any) => {
    switch (item?.type) {
      case "video":
        return "bg-secondary-500";
      case "audio":
        return "bg-primary-500";
      default:
        return "";
    }
  };
  if (!mediaData || mediaData?.error) {
    return <div className="h-screen"></div>;
  }
  return (  
    <div className="pb-8 min-h-screen">
      <div className="lg:flex xl:mx-10">
        <div className="bg-neutral-200 p-4 lg:flex flex-1 gap-4 rounded-lg">
          <div className=" relative flex justify-center items-center">
            <img
              src={`https://api.zm.io.vn/download/?url=${mediaData?.thumbnail}`}
              alt="thumbnail"
              className="object-cover overflow-hidden w-60 h-60 max-h-60 max-w-60 rounded-lg"
            />
            {hasVideo && (
              <span className="absolute rounded-full p-2 text-white cursor-pointer bg-black bg-opacity-60">
                <FaPlay className=" text-3xl" onClick={handleOpenVideo} />
              </span>
            )}
          </div>
          <div className="flex flex-col  pt-8">
            <p className="font-bold mb-5 lg:text-lg xl:text-xl">
              {mediaData?.title}
            </p>
            <p>{mediaData?.author}</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-2 mt-5 lg:mt-0">
          {mediaNotImage?.map((media: any, index: number) =>
            // <button
            //   key={index}
            //   className={`btn-primary ${getClassNameByType(media)}`}
            //   onClick={() =>
            //     handleDownload(
            //       media.url,
            //       `media-${new Date().getTime()}.${media.extension}`
            //     )
            //   }
            // >
            //   <Download className="mr-3" /> {media.quality}
            // </button>
            window?.flutter_inappwebview ? (
              <button
                key={index}
                className={`btn-primary ${getClassNameByType(media)}`}
                onClick={() =>
                  handleDownload(
                    media.url,
                    `media-${new Date().getTime()}.${media.extension}`, media?.type, media?.quality
                  )
                }
              >
                <MdOutlineFileDownload className="mr-3" /> {media.quality}
              </button>
            ) : (
              <a
                key={index}
                className={`btn-primary ${getClassNameByType(media)}`}
                download
                href={`https://api.zm.io.vn/download/?url=${media?.url}`}
              >
                <MdOutlineFileDownload className="mr-3" /> {media.quality}
              </a>
            )
          )}
          {/* {mediaImage?.length > 0 && (
            <button
              onClick={handleDownloadAllImg}
              className={`btn-primary bg-secondary-300`}
            >
              Download All Images
            </button>
          )} */}
          <button
            className={`btn-primary bg-black`}
            onClick={() => router.push(`/`)}
          >
            {t("otherDownload")}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
        {mediaImage?.map((media: any, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center relative"
          >
            <div className="flex flex-col">
              <Image
                src={`https://api.zm.io.vn/download/?url=${media.url}`}
                alt="thumbnail"
                className="object-cover overflow-hidden w-64 h-6w-64 max-h-6w-64 max-w-64 rounded-lg "
              />
              <div className=" flex justify-center items-center mt-2">
                {window?.flutter_inappwebview ? (
                  <button
                    key={index}
                    onClick={() =>
                      handleDownload(
                        media?.url,
                        `media-${new Date().getTime()}.${media?.extension}`, media?.type, media?.quality
                      )
                    }
                    className="font-bold bg-gray-300 text-black p-2 rounded w-full flex justify-center"
                  >
                    <MdOutlineFileDownload />
                  </button>
                ) : (
                  <a
                    key={index}
                    href={`https://api.zm.io.vn/download/?url=${media.url}`}
                    download
                    className="font-bold bg-gray-300 text-black p-2 rounded w-full flex justify-center"
                  >
                    <MdOutlineFileDownload />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={openModalVideo}
        onCancel={handleCloseVideo}
        footer={null}
        closeIcon={null}
        style={{
          maxHeight: "80vh",
        }}
      >
        <div className="relative flex justify-center items-center">
          <video controls autoPlay className="w-full h-full object-cover">
            <source src={hasVideo?.url} type="video/mp4" />
            {/* <source src='https://snapxcdn.com/v2/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3YxOS50aWt0b2tjZG4uY29tL2Q3NWQwYzhlZGVhZTdhMzg4N2JmMDY1ZjFjNWM2ZWMyLzY2OTE1MjZmL3ZpZGVvL3Rvcy91c2Vhc3QyYS90b3MtdXNlYXN0MmEtdmUtMDA2OGMwMDIvb1FZbXpnOW1sU0J1ZklLT0JpRkVRMURBRVJBUjA4WElRUmZaSjAvP2E9MTE4MCZidGk9YkdSdVpIeHZNWEl4Y201M1ptMWNZRjllYldGemFIRm1PZyUzRCUzRCZjaD0wJmNyPTAmZHI9MCZlcj0wJmNkPTAlN0MwJTdDMCU3QzAmY3Y9MSZicj00NDkwJmJ0PTIyNDUmY3M9MCZkcz02JmZ0PVhzRmJfcVQwbUlzUEQxMmlXVFg3M3dVZFouNlNFZUZ-TzUmbWltZV90eXBlPXZpZGVvX21wNCZxcz0wJnJjPU9UazhhRFkzTXprMFpUZHBOemszTmtCcGFqZHVaV3M1Y21wdWJ6TXpOemN6TTBBeUxqWmlZREplTlY0eE1WNDJZVEpnWVNNMmJTMHhNbVEwYmpCZ0xTMWtNVFp6Y3clM0QlM0QmdnZwbD0xJmw9MjAyNDA3MTIwOTU1NDM0M0ZBQkQ2MjE1N0Q4RjBBQTRDNCZidGFnPWUwMDA5MDAwMCZjYz00IiwiZmlsZW5hbWUiOiJTbmFwVGlrLmFwcF83Mjk3ODg2ODkzMzMxNTMzMDYyLm1wNCIsImV4cCI6MTcyMDc4MTc0NH0.OZwfFW_zKhTcLs7irTML0lT-heXAo8Z3Zi_wz4gNd-M&dl=1' type="video/mp4" /> */}
          </video>
          <IoClose
            onClick={handleCloseVideo}
            className="absolute top-[-50px] lg:top-[-20px] right-[-30px] lg:right-[-55px] text-3xl text-white cursor-pointer"
          />
        </div>
      </Modal>
    </div>
  );
}

export default page;
