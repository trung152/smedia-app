import { IoMdArrowDropdown } from "react-icons/io";
const Tooltip = ({ message, children } : any) => (
    <div className="group relative flex justify-center">
      {children}
      <span className="absolute bottom-full mb-1 hidden w-max rounded bg-gray-800 p-2 text-xs text-white group-hover:block">
        {message}
      </span>
    </div>
  );

export default Tooltip;