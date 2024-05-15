"use client";
import { useState, Fragment, useEffect, ChangeEvent } from "react";
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
import CancelModal from "./CancelModal";
import {
  CongregationErrorFormHandler,
  congregationModalProps,
  UserErrorFormHandler,
} from "@/app/types/error";
import { User } from "@prisma/client";
export default function EditCongregationModal({
  isOpen,
  setIsOpen,
  congregation,
}: congregationModalProps) {
  const [congName, setCongName] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState(null);
  const [adminUsers, setAdminUsers] = useState<User[] | null>(null);
  const [selected, setSelected] = useState<User | null>(null);
  const [normalUsers, setNormalUsers] = useState<User[] | null>(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEntity, setEntity] = useState({});
  const [formErrorHandler, setFormErrorHandler] = useState<
    UserErrorFormHandler | CongregationErrorFormHandler
  >({});
  function isUserErrorFormHandler(errorHandler: any): errorHandler is UserErrorFormHandler {
    return (errorHandler as UserErrorFormHandler).user !== undefined;
  }

  function isCongregationErrorFormHandler(
    errorHandler: any
  ): errorHandler is CongregationErrorFormHandler {
    return (errorHandler as CongregationErrorFormHandler).congregation !== undefined;
  }
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    setFormErrorHandler({});
    e.preventDefault(); // This prevents the form from submitting traditionally
    setEntity({
      data: {
        name: userName,
        email: email,
        password: password,
        congregationID: congregation.id,
      },
      addUser: true,
      email: email,
      message: `Are you sure you want to add this user?`,
      function: fetchAddUser,
    });
    setDeleteModal(true);
  };
  function closeEditModal() {
    if (!deleteModal) {
      setIsOpen(false);
    }
  }
  async function patchEditModal() {
    setEntity({
      data: {
        id: congregation.id,
        updateInfo: { congregationName: congName, address },
      },
      message: `Are you sure you want to change the Name/Address of this congregation?`,
      function: fetchEditCongregation,
    });
    setDeleteModal(true);
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
        const result = data.filter((user: User) => user.isAdmin === true);
        const resultNormal = data.filter(
          (user: User) => user.isAdmin === false && user.isGeneralAdmin === false
        );

        setAdminUsers(result);
        setNormalUsers(resultNormal);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    setSelected(null);
    setCongName("");
    setAddress("");
    setUsers(null);
    setAdminUsers(null);
    setSelected(null);
    setNormalUsers(null);
    setUserName("");
    setEmail("");
    setPassword("");

    fetchData();
  }, [congregation]); // Only re-run the effect if `congregation` changes
  console.log(formErrorHandler);
  if (!users) {
    return <h1></h1>;
  }
  return (
    <div>
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
                    Congregation Information
                  </Dialog.Title>
                  <div>
                    <Image
                      src={userImg}
                      alt="User Symbol"
                      className="inline mr-5"
                      height={50}
                    ></Image>
                    <h1 className=" text-md text-black">{`${congregation.congregationName}`}</h1>
                    <h1 className=" text-md text-black">{` ${congregation.address}`}</h1>
                  </div>
                  <div className="flex flex-col bg-slate-500 bg-opacity-10 rounded-xl px-10 py-5">
                    <Dialog.Title className={`underline`}>Admins</Dialog.Title>
                    <h1 className=" text font-extralight">Delete Admin Priveleges from Users</h1>
                    {adminUsers !== null && adminUsers.length !== 0 ? (
                      adminUsers.map((admin, adminIdx) => (
                        <div key={adminIdx} className="flex items-center">
                          <h2 className=" inline-block"> {admin.name}</h2>
                          <button
                            onClick={() => {
                              setDeleteModal(true);
                              setEntity({
                                adminAction: true,
                                data: {
                                  name: admin.name,
                                  id: admin.id,
                                  action: true,
                                },
                                message: `Are you sure you want to remove ${admin.name}'s Administration Priveleges?`,
                                function: fetchEditUser,
                              });
                            }}
                          >
                            <div className="w-5 h-5 ml-3 my-auto">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                className="fill-red-700 hover:fill-red-900"
                              >
                                <path d="M16,8a1,1,0,0,0-1.414,0L12,10.586,9.414,8A1,1,0,0,0,8,9.414L10.586,12,8,14.586A1,1,0,0,0,9.414,16L12,13.414,14.586,16A1,1,0,0,0,16,14.586L13.414,12,16,9.414A1,1,0,0,0,16,8Z" />
                                <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                              </svg>
                            </div>{" "}
                          </button>
                        </div>
                      ))
                    ) : (
                      <h1 className=" text-gray-500 font-light">
                        It seems you have no Admins for this congregation!
                      </h1>
                    )}
                  </div>

                  <div className="flex flex-col bg-slate-500 bg-opacity-10 rounded-xl px-10 py-5">
                    Add User Admin
                    <div className="flex">
                      <div className="flex-grow">
                        {normalUsers !== null && normalUsers.length !== 0 ? (
                          <Listbox
                            value={selected ? selected : null}
                            onChange={(e) => {
                              // console.log("oi", e, "luv");
                              setSelected(e);

                              console.log("shoulda changed", selected);
                            }}
                          >
                            <div className="relative mt-1">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                {selected ? selected.name : "Select a User"}

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
                                  <Listbox.Option
                                    value={null} // Setting the value to null for the empty option
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                      }`
                                    }
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected ? "font-medium" : "font-normal"
                                          }`}
                                        >
                                          None or Select...{" "}
                                          {/* Displaying a friendly name for the empty option */}
                                        </span>
                                      </>
                                    )}
                                  </Listbox.Option>
                                  {normalUsers.map((user, userIdx) => (
                                    <Listbox.Option
                                      key={userIdx}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                          active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                                        }`
                                      }
                                      value={user}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected ? "font-medium" : "font-normal"
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
                        ) : (
                          <h3 className="text-gray-500 font-light">
                            It seems you have no users for this congregation!
                          </h3>
                        )}
                      </div>
                      <button
                        onClick={async () => {
                          setEntity({
                            adminAction: true,
                            data: {
                              name: selected!.name,
                              id: selected!.id,
                              action: false,
                            },
                            message: `Are you sure you want to make ${
                              selected!.name
                            } into an Administrator?`,
                            function: fetchEditUser,
                            email: selected!.email,
                          });
                          setDeleteModal(true);
                        }}
                        disabled={selected === null ? true : false}
                      >
                        <div className="w-7 h-7 ml-4">
                          <svg
                            id="Layer_1"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1"
                            className={`${
                              selected === null
                                ? " fill-gray-400"
                                : "fill-green-400 hover:fill-green-600"
                            }`}
                          >
                            <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col bg-slate-500 bg-opacity-10 rounded-xl px-10 py-5">
                    Add User to Congregation
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="name">Name:</label>
                        <input
                          className={`block border-2 border-black ${
                            isUserErrorFormHandler(formErrorHandler) &&
                            formErrorHandler.user &&
                            formErrorHandler.name
                              ? `border-red-500 text-red-500`
                              : `border-gray-300`
                          }`}
                          type="text"
                          id="name"
                          name="name"
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                          required
                        ></input>
                        {isUserErrorFormHandler(formErrorHandler) &&
                          formErrorHandler.name &&
                          formErrorHandler.user && (
                            <p className="text-red-500 text-xs italic">
                              Change your Name to successfully create a new Email
                            </p>
                          )}
                      </div>
                      <div>
                        <label htmlFor="email">Email:</label>
                        <input
                          className={`block border-2 border-black ${
                            isUserErrorFormHandler(formErrorHandler) &&
                            formErrorHandler.email &&
                            formErrorHandler.user
                              ? `border-red-500 `
                              : `border-gray-300`
                          }`}
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        ></input>
                        {isUserErrorFormHandler(formErrorHandler) &&
                          formErrorHandler.email &&
                          formErrorHandler.user && (
                            <p className="text-red-500 text-xs italic">
                              {" "}
                              Change your email to successfully create a new Email
                            </p>
                          )}
                      </div>
                      <div>
                        <label htmlFor="password">Password:</label>
                        <input
                          className={`block border-2 border-black ${
                            isUserErrorFormHandler(formErrorHandler) &&
                            formErrorHandler.password &&
                            formErrorHandler.user
                              ? `border-red-500 text-red-500`
                              : `border-gray-300`
                          }`}
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        ></input>
                        {isUserErrorFormHandler(formErrorHandler) &&
                          formErrorHandler.password &&
                          formErrorHandler.user && (
                            <p className="text-red-500 text-xs italic">
                              {" "}
                              Change your password to successfully create a new Email
                            </p>
                          )}
                      </div>
                      <button
                        className="border-2 border-black rounded-3xl px-3 mt-2 hover:bg-black hover:text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="bg-slate-500 bg-opacity-10 rounded-xl px-10 py-5">
                    <div className="mt-2">
                      <label htmlFor="Name">Change Congregation Name</label>
                      <input
                        className={`border-[1px] border-gray-400 rounded-lg block ${
                          isCongregationErrorFormHandler(formErrorHandler) &&
                          formErrorHandler.congregationName &&
                          formErrorHandler.congregation
                            ? `border-red-500 text-red-500`
                            : `border-gray-300`
                        }`}
                        type="text"
                        id="congName"
                        value={congName}
                        onChange={(e) => setCongName(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="Name">Change Congregation Address</label>
                      <input
                        className={`border-[1px] border-gray-400 rounded-lg block ${
                          isCongregationErrorFormHandler(formErrorHandler) &&
                          formErrorHandler.address &&
                          formErrorHandler.congregation
                            ? `border-red-500 text-red-500`
                            : `border-gray-300`
                        }`}
                        type="text"
                        id="Name"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
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
      <CancelModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        entity={selectedEntity}
        setFormErrorHandler={setFormErrorHandler}
      ></CancelModal>
    </div>
  );
}
