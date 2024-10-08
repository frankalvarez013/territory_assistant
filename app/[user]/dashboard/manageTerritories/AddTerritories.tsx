"use client";
import { useState } from "react";
import fetchAddTerritory from "@/app/components/fetch/fetchAddTerritory";
import CancelModal from "../CancelModal";
import { TerritoryErrorFormHandler } from "@/app/types/error";
export default function AddTerritories() {
  const [location, setLocation] = useState("");
  const [territoryID, setTerritoryID] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState({});
  const [formErrorHandler, setFormErrorHandler] = useState<TerritoryErrorFormHandler>({});
  return (
    <div>
      <form>
        <div>
          <label htmlFor="territoryID">Add New Territory #:</label>
          <input
            className={`block border-2 border-gray-400 ${
              formErrorHandler && formErrorHandler.territoryID
                ? `border-red-500 text-red-500`
                : `border-gray-300`
            }`}
            type="text"
            id="territoryID"
            name="territoryID"
            value={territoryID}
            onChange={(e) => {
              setTerritoryID(e.target.value);
            }}
            required
          ></input>
          {formErrorHandler && formErrorHandler.territoryID && (
            <p className="text-red-500 text-xs italic">
              {" "}
              This is already a registered Number with that ID, please use another.
            </p>
          )}
          <label htmlFor="location">Add New Location:</label>
          <input
            className={`block border-2 border-gray-400 ${
              formErrorHandler && formErrorHandler.location
                ? `border-red-500 text-red-500`
                : `border-gray-300`
            }`}
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            required
          ></input>
          {formErrorHandler && formErrorHandler.location && formErrorHandler.territory && (
            <p className="text-red-500 text-xs italic">
              {" "}
              This is already a registered Location with that name, please use another.
            </p>
          )}
        </div>
        <button
          className="border-2 mt-2 border-black rounded-3xl px-3 hover:bg-black hover:text-white"
          type="submit"
          onClick={(event) => {
            event?.preventDefault();
            setSelectedEntity({
              data: {
                territoryID: territoryID,
                location: location,
              },

              message: `Are you sure you want to update this user's information?`,
              function: fetchAddTerritory,
            });
            setDeleteModal(true);
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
