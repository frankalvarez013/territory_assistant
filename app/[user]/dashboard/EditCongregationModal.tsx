import { useState, Fragment } from "react";
import check from "../../public/images/check.svg";
import upDown from "../../public/images/chevron-up-down.svg";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import userImg from "../../public/images/user.svg";
import Image from "next/image";
import fetchEditCongregation from "../../components/fetch/fetchEditCongregation";

export default function EditUserModal({ isOpen, setIsOpen, congregation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  function closeEditModal() {
    setIsOpen(false);
  }
  function patchEditModal() {
    fetchEditCongregation(congregation.id, { name, address });
    setIsOpen(false);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col gap-5">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Congregation Information
                </Dialog.Title>
                <div>
                  <Image
                    src={userImg}
                    alt="User Symbol"
                    className="inline mr-5"
                    height={50}
                  ></Image>
                  <h1 className=" text-md text-black">
                    {congregation.congregationName}
                  </h1>
                </div>
                <div className="mt-2">
                  <label htmlFor="Name">Change Congregation Name</label>
                  <input
                    className=" border-[1px] border-gray-400 rounded-lg block"
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="Name">Change Congregation Address</label>
                  <input
                    className=" border-[1px] border-gray-400 rounded-lg block"
                    type="text"
                    id="Name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={patchEditModal}
                  >
                    Save Changes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
