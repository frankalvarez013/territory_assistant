import React, { useEffect, useRef, useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";

export const Nav = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);
  return (
    <nav className="relative flex items-center justify-between flex-wrap py-2 bg-[rgb(65,105,225)]">
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
        <div
          className="absolute top-14 right-0  min-w-min bg-[rgb(65,105,225)] shadow-lg z-50"
          ref={menuRef}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">{children}</div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
