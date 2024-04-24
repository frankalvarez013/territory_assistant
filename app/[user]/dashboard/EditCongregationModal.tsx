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
import CancelModal from "./CancelModal";
export default function EditUserModal({ isOpen, setIsOpen, congregation }) {
  const [congName, setCongName] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState(null);
  const [adminUsers, setAdminUsers] = useState(null);
  const [selected, setSelected] = useState(null);
  const [normalUsers, setNormalUsers] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [del, setDel] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  let congID = congregation.id;
  const handleSubmit = async (e) => {
    e.preventDefault(); // This prevents the form from submitting traditionally
    console.log("should invoke...");
    const result = await fetchAddUser(
      userName,
      email,
      password,
      congregation.id
    );
    if (result) {
      // Refresh the page to reflect changes or reset the state globally
      window.location.reload();
    } else {
      // Optional: Handle error scenario, possibly showing an error message
      console.log(result); // Display an error message if something goes wrong
    }
  };
  function closeEditModal() {
    if (!del) {
      setIsOpen(false);
    }
  }
  async function patchEditModal() {
    const res = await fetchEditCongregation(congregation.id, {
      congregationName: congName,
      address,
    });
    if (res) {
      window.location.reload();
    } else {
      console.log(res);
    }
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
        const resultNormal = data.filter(
          (user) => user.isAdmin === false && user.isGeneralAdmin === false
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
  // console.log("Users", users);
  // console.log("selected", selected);
  // console.log("Normal Users", normalUsers);
  // console.log("Admin Users", adminUsers);

  if (!users) {
    return <h1>loading</h1>;
  }
  console.log(selected);
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
                      {`${congregation.congregationName}`}
                    </h1>
                    <h1 className=" text-md text-black">
                      {` ${congregation.address}`}
                    </h1>
                  </div>
                  <div className="flex flex-col bg-slate-500 bg-opacity-10 rounded-xl px-10 py-5">
                    <Dialog.Title className={`underline`}>Admins</Dialog.Title>
                    <h1 className=" text font-extralight">
                      Delete Admin Priveleges from Users
                    </h1>
                    {adminUsers !== null && adminUsers.length !== 0 ? (
                      adminUsers.map((admin, adminIdx) => (
                        <div key={adminIdx} className="flex items-center">
                          <h2 className=" inline-block"> {admin.name}</h2>
                          <button
                            onClick={() => {
                              setDel(true);
                              setSelectedAdmin(admin.name);
                              // fetchEditUser(admin.id, { isAdmin: false });
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
                        {normalUsers.length !== 0 && normalUsers !== null ? (
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
                                        active
                                          ? "bg-amber-100 text-amber-900"
                                          : "text-gray-900"
                                      }`
                                    }
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
                        ) : (
                          <h3 className="text-gray-500 font-light">
                            It seems you have no users for this congregation!
                          </h3>
                        )}
                      </div>
                      <button
                        onClick={async () => {
                          const res = fetchEditUser(selected.id, {
                            isAdmin: true,
                          });
                          if (res) {
                            window.location.reload();
                          } else {
                          }
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
                          className="block border-2 border-black"
                          type="text"
                          id="name"
                          name="name"
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                          required
                        ></input>
                      </div>
                      <div>
                        <label htmlFor="email">Email:</label>
                        <input
                          className="block border-2 border-black"
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        ></input>
                      </div>
                      <div>
                        <label htmlFor="password">Password:</label>
                        <input
                          className="block border-2 border-black"
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        ></input>
                      </div>
                      <button
                        className="border-2 border-black rounded-3xl px-3"
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
                        className=" border-[1px] border-gray-400 rounded-lg block"
                        type="text"
                        id="congName"
                        value={congName}
                        onChange={(e) => setCongName(e.target.value)}
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
        isOpen={del}
        setIsOpen={setDel}
        congregation={{ selectedAdmin, email, password, congID }}
      ></CancelModal>
    </div>
  );
}
