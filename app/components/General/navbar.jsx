import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center flex-col" onBlur={() => setIsOpen(!isOpen)}>
      <div className="">
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
      <Transition
        show={isOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition duration-200 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="w-full bg-[rgb(65,105,225)]">
            <div className="text-sm flex flex-col">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0  hover:text-black mr-4"
              >
                Dashboard
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0  hover:text-black mr-4"
              >
                Manage Territories
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0  hover:text-black"
              >
                Manage Requests
              </a>{" "}
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0  hover:text-white"
              >
                Sign Out
              </a>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Nav;
