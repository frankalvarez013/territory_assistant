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

export default function EditUserModal({ isOpen, setIsOpen, congregation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState(null);
  function closeEditModal() {
    setIsOpen(false);
  }
  function patchEditModal() {
    fetchEditCongregation(congregation.id, { name, address });
    setIsOpen(false);
  }
  useEffect(() => {
    // Define an async function inside the effect
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user?congID=${congregation.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        setUsers(data); // Set users with fetched data
        // Filter and set selected users after data is fetched and set
        const result = data.filter((user) => user.isAdmin === true);
        setSelected(result);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, [congregation]); // Only re-run the effect if `congregation` changes
  // console.log("Users", users);
  // console.log("selected", selected);
  if (!users) {
    return <h1>loading</h1>;
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
                <Dialog.Title>Admins</Dialog.Title>
                {selected ? (
                  selected.map((admin, adminIdx) => (
                    <div key={adminIdx}>
                      <h2 className=" inline-block">{admin.name}</h2>
                      <button>
                        {" "}
                        <Image
                          src={cross}
                          alt="User Symbol"
                          className="inline mr-5"
                          height={23}
                        ></Image>
                      </button>
                    </div>
                  ))
                ) : (
                  <h1 className=" text-gray-500 font-light">
                    It seems you have no Admins for this congregation!
                  </h1>
                )}
                {users ? (
                  selected ? (
                    <div className="mt-2">
                      Add User Admin
                      <Listbox
                        value={selected}
                        onChange={() => {
                          console.log("changed");
                        }}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <Image
                                src={upDown}
                                alt="User Symbol"
                                className="inline mr-2"
                                height={23}
                              ></Image>
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {users.map((user, userIdx) => (
                                <Listbox.Option
                                  key={userIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={user}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {user.name}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <Image
                                            src={check}
                                            alt="User Symbol"
                                            className="inline mr-5"
                                            height={23}
                                          ></Image>
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  ) : (
                    <div className="mt-2">
                      Add Admin
                      <Listbox
                        onChange={() => {
                          console.log("changed");
                        }}
                      >
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <Image
                                src={upDown}
                                alt="User Symbol"
                                className="inline mr-2"
                                height={23}
                              ></Image>
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {users ? (
                                users.map((user, userIdx) => (
                                  <Listbox.Option
                                    key={userIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-amber-100 text-amber-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={user}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {user.name}
                                        </span>
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))
                              ) : (
                                <h1>oi</h1>
                              )}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  )
                ) : (
                  <h1>lol</h1>
                )}

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
