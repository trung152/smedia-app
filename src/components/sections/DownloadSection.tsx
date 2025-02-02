"use client";
import React, { useEffect, useState } from "react";
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

  console.log("render n lân");
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
          if (response != "null") {
            setUrlInput((prev) => prev + response);
          }else{
            toast.error("Clipboard is empty");
          }
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
    modal.style.marginLeft = "20px";
    modal.style.marginRight = "20px";
    const newIcons = [
      { src: "/images/icons8-vimeo.svg", alt: "Vim" },
      { src: "/images/icons8-reddit.svg", alt: "Red" },
      { src: "/images/icons8-weibo.svg", alt: "Weib" },
      { src: "/images/icons8-soundcloud.svg", alt: "SoundC" },
      { src: "/images/icons8-tumblr.svg", alt: "Tumlr" },
      { src: "/images/icons8-imdb.svg", alt: "IMDB" },
      { src: "/images/icons8-dailymotion.svg", alt: "Dailymo" },
      { src: "/images/icons8-facebook.svg", alt: "FB" },
      { src: "/images/icons8-tiktok.svg", alt: "Tik" },
      { src: "/images/icons8-instagram.svg", alt: "Ins" },
      { src: "/images/icons8-linkedin.svg", alt: "Linked" },
      { src: "/images/icons8-spotify.svg", alt: "Spot" },
      { src: "/images/icons8-twitterx.svg", alt: "Twitt" },
      { src: "/images/icons8-telegram.svg", alt: "Tele" },
      { src: "/images/icons8-pinterest.svg", alt: "Pintrest" },
      { src: "/images/icons8-bilibili.svg", alt: "Bili" },
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
    closeButton.textContent = "OKAY";
    closeButton.className = "close-button";
    closeButton.onclick = () => {
      document.body.removeChild(overlay);
    };
    const closeModal = () => {
      document.body.removeChild(overlay);
    };
    modal.appendChild(closeButton);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeModal();
      }
    });
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

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleDownloadByLink();
    }
  };

  return (
    <div>
      <style></style>
      <section id="downloader" className="section text-center pt-10 sm:pt-16">
        <div className="container mx-auto px-0 md:self-center mb-8 md:mb-0 text-center">
          <div className="text-2xl lg:text-4xl font-bold text-gray-700 mb-8 md:ml-[-50px]">
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-facebook.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">FB</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-instagram.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Insta</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-tiktok.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Tik</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-linkedin.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Linked</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-spotify.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Spot</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-twitterx.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Twitt</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-telegram.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Tele</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-pinterest.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Pintrest</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/icons8-bilibili.svg"
                  alt=""
                  className="size-14"
                />
                <span className="text-xs mt-1">Bili</span>
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
          </div>
          <div className="form w-full m-auto box-shadow md:w-5/6" id="">
            <div className="m-auto flex flex-col lg:flex-row">
              <div className="inline-flex flex-col w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="input w-full h-16 border-gray-300 border rounded-xl p-3 pr-10" // Add padding to the right to make room for the suffix
                    placeholder={t("pasteLinkHere")}
                    min="0"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={handlePasteClick}
                  >
                    <FaRegPaste className="text-2xl text-secondary-500 text-[#525252]" />
                  </div>
                </div>
              </div>
              <button
                onClick={handleDownloadByLink}
                className="btn-primary bg-red-500 hover:bg-red-600 flex items-center justify-center space-x-2"
              >
                {enabled || mutateSocialAutoLink.isPending ? (
                  <ImSpinner9 className="animate-spin text-white size-8" />
                ) : (
                  <>
                    <span className="uppercase font-medium">
                      {t("download")}
                    </span>
                    <img
                      src="/images/icons8-download.svg"
                      alt="Download"
                      className="w-6 h-6"
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
