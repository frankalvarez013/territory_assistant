import { House, Observation, Status } from "@prisma/client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import SelectObservation from "../Interact/SelectObservationADMIN";
import fetchEditHouse from "../fetch/fetchEditHouse";
import ErrorParser from "@/app/utils/ErrorParse";
import { EmptyState, HouseRowProps } from "@/app/types/common";
import type { HouseErrorFormHandler } from "../../types/error.d.ts";
const HouseRow = React.memo(({ house, makeEditable, isEditable }: HouseRowProps) => {
  const [localState, setLocalState] = useState({ ...house });
  const [emptyState, setEmptyState] = useState<EmptyState>({
    Direction: "",
    observation: house.observation,
    StreetAd: "",
    comment: "",
    dateVisited: null,
  });
  const [localSave, setLocalSave] = useState(false);
  const observationValues = useMemo(() => Object.values(Observation), []);
  const [errorFormHandler, setErrorFormHandler] = useState<HouseErrorFormHandler>({});
  const saveHouseData = async () => {
    setErrorFormHandler({});
    const updatedState = { ...localState };
    if (!updatedState.StreetAd || !updatedState.StreetAd.trim())
      updatedState.StreetAd = house.StreetAd;
    if (!updatedState.Direction || !updatedState.Direction.trim())
      updatedState.Direction = house.Direction;
    if (!updatedState.comment || !updatedState.comment.trim()) updatedState.comment = house.comment;
    const res = await fetchEditHouse(
      updatedState.territoryID,
      updatedState.congregationID,
      updatedState.houseID,
      updatedState.Direction,
      updatedState.StreetAd,
      updatedState.comment || undefined,
      updatedState.observation,
      updatedState.dateVisited || undefined
    );
    if (!res.success) {
      const errorParts: {
        field: string | null;
        model: string | null;
      } | null = ErrorParser(res.error);
      if (errorParts && errorParts.model && errorParts.field) {
        setErrorFormHandler({
          [errorParts.model]: errorParts.model,

          [errorParts.field]: errorParts.field,

          error: `Login Failed`,
        });
      }
    }
    setLocalSave(true);
    setEmptyState({
      Direction: localState.Direction,
      StreetAd: localState.StreetAd,
      comment: localState.comment,
      observation: localState.observation,
      dateVisited: localState.dateVisited,
    });
  };
  useEffect(() => {
    if (!isEditable && !localSave) {
      setLocalState({ ...house });
    }
  }, [isEditable, house, localSave]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLocalState((prev: House) => ({ ...prev, [name]: value }));
  };
  return (
    <tr
      key={house.houseID}
      tabIndex={0}
      className=" border-gray-200 focus-within:bg-slate-400 focus-within:outline-none"
      onClick={() => makeEditable(house.houseID)}
    >
      {isEditable ? (
        <>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            {house.status === Status.LLEGA
              ? house.observation === Observation.INGLES ||
                house.observation === Observation.OTRO_IDIOMA ||
                house.observation === Observation.DUERME_DE_DIA ||
                house.observation === Observation.TESTIGOS
                ? "🔵"
                : house.observation === Observation.CANDADO ||
                  house.observation === Observation.EMPTY ||
                  house.observation === Observation.PERRO_EN_CASA
                ? "🟢"
                : "🔴"
              : ""}
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="direction">
              {" "}
              <input
                name="StreetAd"
                type="text"
                placeholder={house.StreetAd}
                onChange={(e) => handleChange(e)}
                value={localState.StreetAd}
              />
              {errorFormHandler && errorFormHandler.StreetAd && (
                <p className="text-red-500 text-xs italic">
                  {" "}
                  Change the address to successfully create a new Email
                </p>
              )}
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="streetAd">
              {" "}
              <input
                name="Direction"
                type="text"
                placeholder={house.Direction}
                onChange={(e) => handleChange(e)}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200 ">
            <SelectObservation
              uniqueOption={emptyState.observation}
              options={observationValues}
              territoryID={house.territoryID.toString()}
              congregationID={house.congregationID}
              houseID={house.houseID.toString()}
              setLocalState={setLocalState}
              handleChange={handleChange}
              localState={localState}
              localSave={localSave}
              isEditable={isEditable}
            />
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="comment">
              {" "}
              <input
                name="comment"
                type="text"
                placeholder={house.comment || ""}
                onChange={(e) => handleChange(e)}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-b ">
            {house.dateVisited
              ? new Date(house.dateVisited).toLocaleDateString("en-US", {
                  /* formatting options here */
                })
              : ""}
          </td>

          <td className="focus-within:bg-none focus:bg-none bg-none">
            <button className="border-black border-2 rounded-2xl px-1 " onClick={saveHouseData}>
              Save
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            {house.status === Status.LLEGA
              ? house.observation === Observation.INGLES ||
                house.observation === Observation.OTRO_IDIOMA ||
                house.observation === Observation.DUERME_DE_DIA ||
                house.observation === Observation.TESTIGOS
                ? "🔵"
                : house.observation === Observation.CANDADO ||
                  house.observation === Observation.EMPTY ||
                  house.observation === Observation.PERRO_EN_CASA
                ? "🟢"
                : "🔴"
              : ""}
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="streetAd">
              {" "}
              <input
                name="streetAd"
                type="text"
                placeholder={house.StreetAd}
                value={emptyState.StreetAd}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="direction">
              {" "}
              <input
                name="direction"
                type="text"
                placeholder={house.Direction}
                value={emptyState.Direction}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200 ">
            <SelectObservation
              uniqueOption={emptyState.observation}
              options={observationValues}
              territoryID={house.territoryID.toString()}
              congregationID={house.congregationID}
              houseID={house.houseID.toString()}
              setLocalState={setLocalState}
              handleChange={handleChange}
              localState={localState}
              localSave={localSave}
              isEditable={isEditable}
            />
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="comment">
              {" "}
              <input
                name="comment"
                type="text"
                placeholder={house.comment || ""}
                value={emptyState.comment || ""}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-b ">
            {house.dateVisited
              ? new Date(house.dateVisited).toLocaleDateString("en-US", {
                  /* formatting options here */
                })
              : ""}
          </td>
        </>
      )}
    </tr>
  );
});
HouseRow.displayName = "HouseRow";
export default HouseRow;
