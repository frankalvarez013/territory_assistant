import { useSession } from "next-auth/react";
import fetchAddUser from "@/app/components/fetch/fetchAddUser";
import { useState } from "react";
import { Role } from "@prisma/client";
import DeleteUserModal from "./deleteUserModal";
import CancelModal from "../CancelModal";
export default function AddUsers() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(Role.Approved);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEntity, setEntity] = useState({});
  const [formErrorHandler, setFormErrorHandler] = useState({});
  var roles = Object.keys(Role).map((key) => key);
  const handleChange = (e) => {
    setRole(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // This prevents the form from submitting traditionally
    setEntity({
      data: {
        name: name,
        email: email,
        password: password,
        congregationID: session?.user?.congID,
        Role: role,
      },
      addUser: true,
      email: email,
      message: `Are you sure you want to add a new user?`,
      function: fetchAddUser,
    });
    setDeleteModal(true);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            className={`block border-2 border-black ${
              formErrorHandler.name && formErrorHandler.user
                ? `border-red-500 text-red-500`
                : `border-gray-300`
            }`}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className={`block border-2 border-black ${
              formErrorHandler.email && formErrorHandler.user
                ? `border-red-500 text-red-500`
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
          {formErrorHandler.email && formErrorHandler.user && (
            <p className="text-red-500 text-xs italic">
              Change your email to successfully create a new Email
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="block border-2 border-gray-300"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>
          {formErrorHandler.password && formErrorHandler.user && (
            <p className="text-red-500 text-xs italic">
              Change your Password to successfully create a new Email
            </p>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="role">Role:</label>
          <select
            className=" bg-white hover:border-black border-2 rounded-xl px-3 ml-2"
            onChange={handleChange}
            value={role}
            id={""}
            name="observation"
          >
            <option value={""}>{Role.Approved}</option>
            {roles.map((option, index) => {
              if (option !== Role.Approved) {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              }
            })}
          </select>
        </div>
        <button
          className="border-2 mt-2 border-gray-300 rounded-3xl px-3 hover:bg-black hover:text-white hover:border-black"
          type="submit"
        >
          Submit
        </button>
      </form>
      <CancelModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        entity={selectedEntity}
        setFormErrorHandler={setFormErrorHandler}
      ></CancelModal>
    </div>
  );
}
