import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { useTranslations } from 'next-intl';

const FAQCollapse: React.FC = () => {
  const t = useTranslations();

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: t('downloadWithoutWatermark'),
      children: <p>{t('openApp')}</p>,
    },
    {
      key: "2",
      label: t('downloadLocation'),
      children: <p>{t('defaultDownloadFolder')}</p>,
    },
    {
      key: "3",
      label: t('storeVideos'),
      children: <p>{t('noHosting')}</p>,
    },
    {
      key: "4",
      label: t('extensionsRequired'),
      children: <p>{t('noExtensions')}</p>,
    },
    {
      key: "5",
      label: t('paymentRequired'),
      children: <p>{t('noPayment')}</p>,
    },
    {
      key: "6",
      label: t('androidDownload'),
      children: <p>{t('androidInstructions')}</p>,
    },
    {
      key: "7",
      label: t('downloadLimit'),
      children: <p>{t('noLimit')}</p>,
    },
    {
      key: "8",
      label: t('highDefinition'),
      children: <p>{t('hdSupport')}</p>,
    },
    {
      key: "9",
      label: t('videoEditing'),
      children: <p>{t('noEditing')}</p>,
    },
    {
      key: "10",
      label: t('mp3Download'),
      children: <p>{t('mp3Support')}</p>,
    },
  ];

  return (
    <div id="faq" className="flex flex-col justify-center items-center py-10 sm:py-16">
      <div className="mt-10 w-5/6 ">
        <div className="text-center text-gray-700 text-xl xl:text-3xl font-semibold mb-6 xl:mb-16">
          {t('faqHeading')}
        </div>
        <Collapse accordion items={items} />
      </div>
    </div>
  );
};

export default FAQCollapse;
