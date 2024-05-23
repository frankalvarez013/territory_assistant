import React, { useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="relative flex items-center justify-between flex-wrap py-2 bg-[rgb(65,105,225)]"
      onBlur={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded border-2 border-white hover:text-black hover:border-black"
        >
          {isOpen ? (
            <XIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-14 right-0  min-w-min bg-[rgb(65,105,225)] shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#responsive-header"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-black hover:bg-gray-200"
            >
              Dashboard
            </a>
            <a
              href="#responsive-header"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-black hover:bg-gray-200"
            >
              Manage Territories
            </a>
            <a
              href="#responsive-header"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-black hover:bg-gray-200"
            >
              Manage Requests
            </a>
            <a
              href="#responsive-header"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-black hover:bg-gray-200"
            >
              Sign Out
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
