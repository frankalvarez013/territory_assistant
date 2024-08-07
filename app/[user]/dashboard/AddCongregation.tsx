"use client";
import { useState } from "react";
import fetchAddCongregation from "@/app/components/fetch/fetchAddCongregation";
import CancelModal from "./CancelModal";
import { addCongregationProps, CongregationErrorFormHandler, errorEntity } from "@/app/types/error";

export default function AddCongregation() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedEntity, SetSelectedEntity] = useState<errorEntity<addCongregationProps>>({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [formErrorHandler, setFormErrorHandler] = useState<CongregationErrorFormHandler>({});

  return (
    <div>
      <form>
        <div>
          <div className=" mt-5 font-light text-slate-500">Create Congregation.</div>
          <label htmlFor="location">Name of Congregation:</label>
          <input
            className={`block border-2 border-black w-48 md:w-auto ${
              formErrorHandler.congregationName && formErrorHandler.congregation
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
          {formErrorHandler.congregationName && formErrorHandler.congregation && (
            <p className="text-red-500 text-xs italic">
              {" "}
              Change the name to successfully create a new Email
            </p>
          )}
          <label htmlFor="Address">Address:</label>
          <input
            className={`block border-2 border-black mb-5 w-48 md:w-auto ${
              formErrorHandler.address && formErrorHandler.congregation
                ? `border-red-500 text-red-500`
                : `border-gray-300`
            }`}
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          ></input>
          {formErrorHandler.address && formErrorHandler.congregation && (
            <p className="text-red-500 text-xs italic">
              {" "}
              Change the address to successfully create a new Email
            </p>
          )}
        </div>
        <button
          className="border-2 border-black rounded-3xl px-3 hover:bg-black hover:text-white"
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
        setFormErrorHandler={setFormErrorHandler}
      ></CancelModal>
    </div>
  );
}
