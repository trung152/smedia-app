"use client";
import React, { useEffect, useState } from "react";
import { Typewriter } from "nextjs-simple-typewriter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSocialJob, PostSocialJob } from "@/service/api";
import { useSocialAutoLink } from "@/context/SocialAutoLinkContext";
import FullScreenLoading from "../common/Loading";
import { Input } from "antd";
import Tooltip from "../common/Tooltip";
import { PiAsterisk } from "react-icons/pi";
import { FaRegPaste } from "react-icons/fa6";
import { isValidUrl, secretKey } from "@/lib/utils";
import CryptoJS from "crypto-js";
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
function DownloadSection() {
  const [urlInput, setUrlInput] = useState("");
  const router = useRouter();
  const { setSocialAutoLinkData } = useSocialAutoLink();
  const t = useTranslations();
  const [jobId, setJobId] = useState("");
  const [enabled, setEnabled] = useState(false);
  console.log("🚀 ~ DownloadSection ~ enabled:", enabled)

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
      <section id="downloader" className="section text-center pt-10 sm:pt-16">
        <div className="container mx-auto px-0 md:self-center mb-8 md:mb-0 text-center">
          <p className="text-2xl lg:text-4xl font-bold text-gray-700 mb-8 md:ml-[-50px]">
            {t("downloadPhotosVideos")}
            <span className="text-secondary-300 block w-full md:inline-block md:w-12 ml-2 text-center">
              <Typewriter
                words={[
                  "Tiktok",
                  "Instagram",
                  "Facebook",
                  "LinkedIn",
                  "Twitter",
                ]}
                loop={0} // 0 hoặc false để lặp vô hạn
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={70}
                delaySpeed={1000}
              />
            </span>
          </p>
          <p className="description">{t("pasteUrlToDownload")}</p>

          <div className="form w-full  m-auto py-10 box-shadow md:w-5/6" id="">
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
                  placeholder="https://"
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
              <button onClick={handleDownloadByLink} className="btn-primary">
                {enabled || mutateSocialAutoLink.isPending ? (
                  <ImSpinner9 className="animate-spin text-white size-8" />
                ) : (
                  t("download")
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
          <div className="">
            <p>{t("noWatermarksRegistration")}</p>
          </div>
        </div>
      </section>
      {/* {mutateSocialAutoLink.isPending && <FullScreenLoading />} */}
    </div>
  );
}

export default DownloadSection;
