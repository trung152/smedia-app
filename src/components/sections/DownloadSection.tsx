"use client";
import React, { useEffect, useState } from "react";
import { Typewriter } from "nextjs-simple-typewriter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSocialJob, PostSocialJob } from "@/service/api";
import { useSocialAutoLink } from "@/context/SocialAutoLinkContext";
import { Input } from "antd";
import Tooltip from "../common/Tooltip";
import { FaRegPaste } from "react-icons/fa6";
import { isValidUrl, secretKey } from "@/lib/utils";
import CryptoJS from "crypto-js";
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { HiDotsHorizontal } from "react-icons/hi";
function DownloadSection() {
  const [urlInput, setUrlInput] = useState("");
  const router = useRouter();
  const { setSocialAutoLinkData } = useSocialAutoLink();
  const t = useTranslations();
  const [jobId, setJobId] = useState("");
  const [enabled, setEnabled] = useState(false);
  console.log("🚀 ~ DownloadSection ~ enabled:", enabled);

  const {
    data: dataMedia,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myData", jobId],
    queryFn: () => getSocialJob(jobId),
    refetchInterval: (data: any) => {
      const myData = data?.state;
      // console.log("🚀 ~ DownloadSection ~ myData:", myData);
      // Kiểm tra nếu data có trạng thái completed thì dừng gọi API
      /*   if (myData?.status === "Complete" || myData?.status === "Timeout") {
        return false; // Dừng refetch
      } */
      if (enabled && myData?.dataUpdateCount > 16) {
        setEnabled(false);
        toast.error("Request Timeout, please try again later", {
          id: "request_timeout",
        });
        return false;
      }

      return 2000; // Tiếp tục gọi API sau mỗi 2 giây
    },
    // // Đảm bảo luôn refetch kể cả khi component không focus
    // refetchIntervalInBackground: true,
    enabled: enabled,
  });

  useEffect(() => {
    if (dataMedia?.data?.status === "Complete") {
      setEnabled(false);
    }
    if (dataMedia?.data?.status === "Timeout") {
      toast.error("Request Timeout, please try again later");
      setEnabled(false);
    }

    if (isError) {
      window.gtag("event", "api_request_error");
      setEnabled(false);
      toast.error("An error occurred while fetching data");
    }

    if (dataMedia?.data?.payload && !dataMedia?.data?.payload?.error) {
      setSocialAutoLinkData(dataMedia?.data?.payload);
      window.gtag("event", "api_request_data_success");
      router.push("/download");
    } else if (dataMedia?.data?.payload?.error) {
      toast.error(dataMedia?.data?.payload?.message);
      window.gtag("event", "api_request_data_error");
    }
  }, [dataMedia]);

  const mutateSocialAutoLink = useMutation({
    mutationFn: (data: any) => PostSocialJob(data),
    onMutate: () => {},
    onError: () => {
      console.log("error");
    },

    onSuccess: (data) => {
      console.log("🚀 ~ DownloadSection ~ data:", data?.data);
      if (data?.data?.job) {
        setJobId(data?.data?.job);
        window.gtag("event", "api_request_start");
        setEnabled(true);
      }
    },
  });

  const handlePasteClick = () => {
    if (window?.flutter_inappwebview) {
      window.flutter_inappwebview
        .callHandler("onPasteInFlutter", "???")
        .then(function (response: any) {
          // console.log("Phản hồi từ Flutter: " + response);
          setUrlInput((prev) => prev + response);
        });
    } else {
      navigator.clipboard
        .readText()
        .then((text) => {
          setUrlInput(text);
          // alert(`Pasted content: ${text}`);
        })
        .catch((err) => {
          console.error("Failed to read clipboard contents: ", err);
        });
    }
  };

  const handleSeeMoreClick = () => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const newIcons = [
      { src: "/images/icons8-vimeo.svg", alt: "Vimeo" },
      { src: "/images/icons8-reddit.svg", alt: "Reddit" },
      { src: "/images/icons8-weibo.svg", alt: "Weibo" },
      { src: "/images/icons8-soundcloud.svg", alt: "SoundCloud" },
      { src: "/images/icons8-tumblr.svg", alt: "Tumblr" },
      { src: "/images/icons8-imdb.svg", alt: "IMDB" },
      { src: "/images/icons8-dailymotion.png", alt: "Dailymotion" },
      { src: "/images/icons8-facebook.svg", alt: "Facebook" },
      { src: "/images/icons8-tiktok.svg", alt: "TikTok" },
      { src: "/images/icons8-instagram.svg", alt: "Instagram" },
      { src: "/images/icons8-linkedin.svg", alt: "LinkedIn" },
      { src: "/images/icons8-spotify.svg", alt: "Spotify" },
      { src: "/images/icons8-twitterx.svg", alt: "Twitter" },
      { src: "/images/icons8-telegram.svg", alt: "Telegram" },
      { src: "/images/icons8-pinterest.svg", alt: "Pinterest" },
      { src: "/images/icons8-bilibili.svg", alt: "Bilibili" },
    ];

    newIcons.forEach((icon) => {
      const iconContainer = document.createElement("div");
      iconContainer.className = "icon-container";

      const img = document.createElement("img");
      img.src = icon.src;
      img.alt = icon.alt;

      const label = document.createElement("span");
      label.textContent = icon.alt;
      label.className = "icon-label";

      iconContainer.appendChild(img);
      iconContainer.appendChild(label);
      modal.appendChild(iconContainer);
    });

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "close-button";
    closeButton.onclick = () => {
      document.body.removeChild(overlay);
    };
    modal.appendChild(closeButton);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  };

  const handleDownloadByLink = () => {
    if (enabled || mutateSocialAutoLink.isPending) {
      return "";
    }
    window.gtag("event", "btn_download");
    if (urlInput && isValidUrl(urlInput)) {
      try {
        const data = { url: urlInput };
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          secretKey!
        ).toString();
        mutateSocialAutoLink.mutate({ data: encryptedData });
        // if (result.data) {
        //   if (result.data?.data?.error) {
        //     return toast.error(result.data?.data?.message);
        //   }
        //   // Assuming the result.data contains the information you need
        //   setSocialAutoLinkData(result.data?.data);
        //   router.push(`/download`);
        // }
      } catch (error) {
        toast.error("An error occurred while fetching data.");
      }
    } else {
      toast.error("Invalid URL");
    }
  };

  return (
    <div>
      <style></style>
      <section id="downloader" className="section text-center pt-10 sm:pt-16">
        <div className="container mx-auto px-0 md:self-center mb-8 md:mb-0 text-center">
          <p className="text-2xl lg:text-4xl font-bold text-gray-700 mb-8 md:ml-[-50px]">
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-facebook.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Facebook</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-instagram.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Instagram</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-tiktok.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">TikTok</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-linkedin.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">LinkedIn</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-spotify.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Spotify</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-twitterx.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Twitter</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-telegram.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Telegram</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-pinterest.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Pinterest</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-bilibili.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Bilibili</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={handleSeeMoreClick}
                  className="p-0 bg-transparent"
                >
                  <img
                    src="/images/icons8-seemore.svg"
                    alt="See more"
                    className="size-14"
                  />
                </button>
                <span className="text-xs mt-1">See more</span>
              </div>
            </div>
          </p>
          <div className="form w-full m-auto box-shadow md:w-5/6" id="">
            <div className="w-5/6 m-auto flex flex-col lg:flex-row">
              <div className="inline-flex flex-col w-full">
                <Input
                  accept=""
                  type="text"
                  name="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="input h-16 falsefalse border-gray-300 border rounded-xl p-3"
                  id=""
                  onPressEnter={handleDownloadByLink}
                  placeholder="Paste link here..."
                  min="0"
                  suffix={
                    <Tooltip message={t("paste")}>
                      <FaRegPaste
                        className="text-2xl text-secondary-500"
                        onClick={handlePasteClick}
                      />
                    </Tooltip>
                  }
                />
              </div>
              <button
                onClick={handleDownloadByLink}
                className="btn-primary bg-red-500 hover:bg-red-600 flex items-center justify-center space-x-2"
              >
                {enabled || mutateSocialAutoLink.isPending ? (
                  <ImSpinner9 className="animate-spin text-white size-8" />
                ) : (
                  <>
                    
                    <span>{t("Download")}</span>
                    <img
                      src="/images/icons8-download.svg"
                      alt="Download"
                      className="w-5 h-5"
                    />
                  </>
                )}
              </button>
            </div>
            <div className="w-5/6 m-auto flex flex-col lg:flex-row mt-10 gap-4 justify-center">
              {/*  <div className="flex  overflow-auto gap-4">
                {typeMedia === "image" ? (
                  <ImagePreview imageUrls={listImg} />
                ) : (
                  <VideoPreview videoUrl={url} />
                )}
              </div> */}
              {/*   <div className="flex justify-center items-center gap-4 min-w-max ">
                <a
                  onClick={handleDownloadToDevice}
                  className="w-full flex p-4 items-center justify-center h-14 border rounded-xl border-primary-300 font-bold cursor-pointer"
                >
                  <Download className="mr-4" />
                  Download{" "}
                  <span className="hidden sm:inline-block ml-1">
                    to your device
                  </span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* {mutateSocialAutoLink.isPending && <FullScreenLoading />} */}
    </div>
  );
}

export default DownloadSection;
