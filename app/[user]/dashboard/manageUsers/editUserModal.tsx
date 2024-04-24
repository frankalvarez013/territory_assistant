import { useState, Fragment } from "react";
import check from "../../../public/images/check.svg";
import upDown from "../../../public/images/chevron-up-down.svg";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import userImg from "../../../public/images/user.svg";
import Image from "next/image";
import fetchEditUser from "../../../components/fetch/fetchEditUser";

export default function EditUserModal({
  user,
  isOpen,
  setIsOpen,
  congregations,
}) {
  const congregation = congregations.find(
    (congregation) => congregation.id === user.congregationID
  );
  const [selected, setSelected] = useState(congregation);
  const [congregationID, setCongregationID] = useState(congregation.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function setEm(e) {
    setSelected(e);
    setCongregationID(e.id);
  }
  function closeEditModal() {
    setIsOpen(false);
  }
  function patchEditModal() {
    console.log("OOI");
    fetchEditUser(user.id, { name, email, password, congregationID });
    setIsOpen(false);
    // window.location.reload();
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
                  User Information
                </Dialog.Title>
                <div>
                  <Image
                    src={userImg}
                    alt="User Symbol"
                    className="inline mr-5"
                    height={50}
                  ></Image>
                  <h1>{user.name}</h1>
                </div>
                <div className="mt-2">
                  Change Congregations
                  <Listbox value={selected} onChange={setEm}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selected.congregationName}
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
                          {congregations.map(
                            (congregation, congregationIdx) => (
                              <Listbox.Option
                                key={congregationIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={congregation}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {congregation.congregationName}
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
                            )
                          )}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <div className="mt-2">
                  <label htmlFor="Name">Change Name</label>
                  <input
                    className=" border-[1px] border-gray-400 rounded-lg block"
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="Email">Change Email</label>
                  <input
                    className=" border-[1px] border-gray-400 rounded-lg block"
                    type="text"
                    id="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="Password">Change Password</label>
                  <input
                    className=" border-[1px] border-gray-400 rounded-lg block"
                    type="text"
                    id="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
