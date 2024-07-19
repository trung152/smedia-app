import React from 'react';
import { RiLoader4Fill } from "react-icons/ri";

const FullScreenLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[5555]">
      <RiLoader4Fill className="animate-spin text-white w-10 h-10 lg:w-16 lg:h-16" />
    </div>
  );
};

export default FullScreenLoading;