import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { KeenIcon } from "@/components";

const SidebarHeader = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div className="flex items-center gap-2.5 px-3.5 h-[70px]">
        <Link to="/">
          <img
            src={"../../../../public/judy-favicon.ico"}
            className="dark:hidden h-[42px]"
          />
        </Link>
        <span className="text-base font-medium text-gray-900 grow justify-center">
          Jadwa Website
        </span>
      </div>

      <div className="pt-2.5 px-3.5 mb-1">
        <div className="input">
          <KeenIcon icon="magnifier" />
          <input
            placeholder="Search"
            type="text"
            className="min-w-0"
            value=""
          />
        </div>
      </div>
    </div>
  );
});
export { SidebarHeader };
