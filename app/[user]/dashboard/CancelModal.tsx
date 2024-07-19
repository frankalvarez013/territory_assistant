"use client";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import ErrorParser from "@/app/utils/ErrorParse";
import { ErrorFormHandler, errorModal, errorParts } from "@/app/types/error";
import { Congregation, House, Territory, User } from "@prisma/client";
export default function CancelModal({
  isOpen,
  setIsOpen,
  entity,
  setFormErrorHandler,
}: errorModal) {
  function closeEditModal() {
    setIsOpen(false);
  }
  function dynamicCall<T extends (...args: any[]) => any>(
    func: T,
    paramsObj: Record<string, any>
  ): ReturnType<T> {
    const args: any[] = Object.values(paramsObj);
    return func(...args);
  }
  async function patchEditModal() {
    if (entity.adminAction) {
      if (entity.data.action) {
        const res = entity.function(entity.data.id, {
          isAdmin: false,
        });
      } else {
        try {
          const res = entity.function(entity.data.id, {
            isAdmin: true,
          });
          let subject = "Territory Assistant: Admin Priveleges Granted";
          let message = `You have been given the Administration Role for your Congregation! Use the listed url to access the website and login with your credentials:
           <a href="https://territoryAssistant.app/signIn">TerritoryAssistant.app`;

          let email = entity.email;
          console.log("bro", entity);
          const response = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, subject, message }),
          });
          console.log("add");
          window.location.reload();
        } catch (e) {
          console.error(e);
          console.log(e);
        }
      }
    } else if (entity.function) {
      const res = await dynamicCall(entity.function, entity.data);
      if (!res.success) {
        console.log("parsing....");
        const errorParts: errorParts = ErrorParser(res.error);
        console.log("Error Field:", errorParts);
        if (errorParts && errorParts.model && errorParts.field) {
          setFormErrorHandler({
            [errorParts.model]: true,

            [errorParts.field]: true,

            error: `Login Failed`,
          });
        }

        setIsOpen(false);
      } else {
        console.log("Success", entity.addUser);
        if (entity.addUser) {
          let subject = "Territory Assistant: User Priveleges Granted";
          let message = `You have been given a User Role for your Congregation! Use the listed url to access the website and login with your credentials:
         <a href="https://territoryAssistant.app/signIn">TerritoryAssistant.app</a>`;
          let email = entity.email;
          const response = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, subject, message }),
          });
        }
        window.location.reload();
      }
    } else {
      console.log("no Function!!");
    }
  }
  if (!entity || !entity.data) {
    <h1>loading</h1>;
  } else {
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {entity.message}
                  </Dialog.Title>
                  <div className="bg-slate-500 bg-opacity-10 rounded-xl px-10 py-5">
                    <div className="mt-4 ">
                      <button
                        type="submit"
                        className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={patchEditModal}
                      >
                        Save Changes
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel
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
}
