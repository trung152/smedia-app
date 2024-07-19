import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaWeibo,
  FaImdb,
} from "react-icons/fa";
import {
  SiVimeo,
  SiSnapchat,
  SiBilibili,
  SiDailymotion,
  SiLinkedin,
  SiPinterest,
  SiReddit,
  SiTumblr,
  SiTelegram,
  SiSpotify,
  SiSoundcloud,
} from "react-icons/si";
import {
  MdOutlineFileCopy,
  MdContentPasteGo,
  MdDownloadForOffline,
  MdOutlineFileDownload,
} from "react-icons/md";
import Tooltip from "../common/Tooltip";
import { useTranslations } from "next-intl";
const icons = [
  {
    component: FaFacebook,
    hoverColor: "hover:text-blue-600",
    title: "Facebook",
  },
  {
    component: FaInstagram,
    hoverColor: "hover:text-pink-600",
    title: "Instagram",
  },
  { component: FaTwitter, hoverColor: "hover:text-blue-400", title: "Twitter" },
  { component: FaTiktok, hoverColor: "hover:text-black", title: "Tiktok" },
  { component: SiVimeo, hoverColor: "hover:text-blue-500", title: "Vimeo" },
  {
    component: SiBilibili,
    hoverColor: "hover:text-blue-600",
    title: "Bilibili",
  },
  {
    component: SiDailymotion,
    hoverColor: "hover:text-blue-700",
    title: "Dailymotion",
  },
  {
    component: SiLinkedin,
    hoverColor: "hover:text-blue-800",
    title: "Linkedin",
  },
  {
    component: SiPinterest,
    hoverColor: "hover:text-red-500",
    title: "Pinterest",
  },
  { component: SiReddit, hoverColor: "hover:text-orange-500", title: "Reddit" },
  { component: SiTumblr, hoverColor: "hover:text-blue-600", title: "Tumblr" },
  {
    component: SiTelegram,
    hoverColor: "hover:text-blue-400",
    title: "Telegram",
  },
  {
    component: SiSpotify,
    hoverColor: "hover:text-green-500",
    title: "Spotify",
  },
  {
    component: SiSoundcloud,
    hoverColor: "hover:text-orange-600",
    title: "Soundcloud",
  },
  { component: FaWeibo, hoverColor: "hover:text-red-500", title: "Weibo" },
  { component: FaImdb, hoverColor: "hover:text-yellow-500", title: "IMDb" },
];

const SupportedSocialSection: React.FC = () => {
  const t = useTranslations();
  return (
    <div id="help" className="p-4 py-10 sm:py-16">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 p-8 gap-6">
          <div className="flex flex-col justify-center items-center font-medium">
            <MdOutlineFileCopy className="w-16 h-16 text-secondary-600 mb-4" />
            <h2 className="text-xl font-semibold text-center mb-2">
              {t("copyUrl")}
            </h2>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              {t("copyUrlInstructions")}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center font-medium">
            <MdContentPasteGo className="w-16 h-16 text-secondary-600 mb-4" />
            <h2 className="text-xl font-semibold text-center mb-2">
              {t("pasteInSearchField")}
            </h2>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              {t("pasteUrlInstructions")}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center font-medium">
            <MdDownloadForOffline className="w-16 h-16 text-secondary-600 mb-4" />
            <h2 className="text-xl font-semibold text-center mb-2">
              {t("download")}
            </h2>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              {t("downloadFiles")}{" "}
              {
                <MdOutlineFileDownload className="size-5 text-black mb-4 inline" />
              }{" "}
              {t("startDownload")}
            </p>
          </div>
        </div>

        {/*  <div className="flex justify-center items-center font-medium">
        

            */}
      </div>
      <div className="text-center text-gray-700 text-xl xl:text-3xl font-semibold mb-6 xl:mb-16 mt-10 xl:mt-16">
        {t("supportedNetworks")}
      </div>
      <div className="grid grid-cols-3  md:grid-cols-4 xl:grid-cols-5 gap-6">
        {icons.map((icon, index) => {
          const IconComponent = icon.component;
          return (
            <div key={index} className="flex justify-center">
              <Tooltip key={index} message={icon.title}>
                <IconComponent
                  className={`text-gray-500 ${icon.hoverColor}`}
                  size={40}
                />
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportedSocialSection;
