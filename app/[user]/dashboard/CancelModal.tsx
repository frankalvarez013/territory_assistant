"use client";
import { useState, Fragment, useEffect } from "react";
import check from "../../public/images/check.svg";
import upDown from "../../public/images/chevron-up-down.svg";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import userImg from "../../public/images/user.svg";
import Image from "next/image";
import fetchEditCongregation from "../../components/fetch/fetchEditCongregation";
import cross from "../../public/images/cross-circle.svg";
import plus from "../../public/images/plus-circle.svg";
import fetchAddUser from "@/app/components/fetch/fetchAddUser";
import fetchEditUser from "@/app/components/fetch/fetchEditUser";

export default function CancelModal({ isOpen, setIsOpen, congregation }) {
  function closeEditModal() {
    setIsOpen(false);
  }
  async function patchEditModal() {
    console.log("Lol", congregation);
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
                  {`Are You Sure you want to remove admin priveleges from this user? ${congregation.selectedAdmin}`}
                </Dialog.Title>
                <div className="bg-slate-500 bg-opacity-10 rounded-xl px-10 py-5">
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={patchEditModal}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
