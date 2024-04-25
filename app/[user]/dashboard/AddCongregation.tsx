"use client";
import { useState } from "react";
import fetchAddCongregation from "@/app/components/fetch/fetchAddCongregation";
import fetchAddUser from "@/app/components/fetch/fetchAddUser";
import CancelModal from "./CancelModal";

export default function AddCongregation() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedEntity, SetSelectedEntity] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div>
      <form>
        <div>
          <div className=" mt-5 font-light text-slate-500">Create Congregation.</div>
          <label htmlFor="location">Name of Congregation:</label>
          <input
            className="block border-2 border-black"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
          <div className="mb-5">
            <label htmlFor="Address">Address:</label>
            <input
              className="block border-2 border-black"
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            ></input>
          </div>
        </div>
        {/* <div>
          <div className=" mt-5 font-light text-slate-500">Create Admin For the Congregation</div>
          <label htmlFor="location">Name:</label>
          <input
            className="block border-2 border-black"
            type="text"
            id="name"
            name="name"
            value={uName}
            onChange={(e) => {
              setUName(e.target.value);
            }}
            required
          ></input>
          <label htmlFor="Address">Email:</label>
          <input
            className="block border-2 border-black"
            type="text"
            id="address"
            name="address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          ></input>
          <label htmlFor="Address">Password:</label>
          <input
            className="block border-2 border-black"
            type="text"
            id="address"
            name="address"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></input>
        </div> */}
        <button
          className="border-2 border-black rounded-3xl px-3"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            SetSelectedEntity({
              data: { name, address },
              message: "Are you sure you want to add this new congregation?",
              function: fetchAddCongregation,
            });
            setDeleteModal(true);
            // const res = await fetchAddCongregation(name, address);
          }}
        >
          Submit
        </button>
      </form>
      <CancelModal
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        entity={selectedEntity}
      ></CancelModal>
    </div>
  );
}
