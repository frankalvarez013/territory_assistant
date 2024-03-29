import { Observation, Status } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import SelectObservation from "../Interact/SelectAddObservation";
import fetchAddHouse from "../fetch/fetchAddHouse";
import plus from "../../public/images/plus.svg";
import Image from "next/image";
const AddHouseRow = React.memo((props) => {
  const [localState, setLocalState] = useState({
    Direction: "",
    observation: Observation.EMPTY,
    StreetAd: "",
    comment: "",
    dateVisited: "",
  });
  const observationValues = useMemo(() => Object.values(Observation), []);
  const saveHouseData = async () => {
    if (!localState.StreetAd || !localState.StreetAd.trim())
      localState.StreetAd = localState.StreetAd;
    if (!localState.Direction || !localState.Direction.trim())
      localState.Direction = localState.Direction;
    if (!localState.comment || !localState.comment.trim())
      localState.comment = localState.comment;
    console.log("Saving", localState, "terrID: ", props.territoryID);
    fetchAddHouse(
      parseInt(props.territoryID),
      localState.Direction,
      localState.StreetAd,
      localState.comment,
      localState.observation,
      undefined
    );
    props.setUpdate(!props.update);
  };
  useEffect(() => {
    setLocalState({
      Direction: "",
      observation: Observation.EMPTY,
      StreetAd: "",
      comment: "",
      dateVisited: "",
    });
  }, [props.isEditable, props.update]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLocalState((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <tr
      key={200}
      tabIndex={0}
      className=" border-gray-200 focus-within:bg-slate-400 focus-within:outline-none"
      onClick={() => props.makeEditable(200)}
    >
      {props.isEditable ? (
        <>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            Add New Houses:{" "}
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="direction">
              {" "}
              <input
                name="StreetAd"
                type="text"
                placeholder={"Add StreetAd"}
                onChange={(e) => handleChange(e)}
                value={localState.StreetAd}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="streetAd">
              {" "}
              <input
                name="Direction"
                type="text"
                placeholder={"Add Direction"}
                onChange={(e) => handleChange(e)}
                value={localState.Direction}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200 ">
            <SelectObservation
              uniqueOption={localState.observation}
              options={observationValues}
              houseID={200}
              setLocalState={setLocalState}
              handleChange={handleChange}
              localState={localState}
              isEditable={props.isEditable}
            />
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="comment">
              {" "}
              <input
                name="comment"
                type="text"
                placeholder={"Add Comment"}
                onChange={(e) => handleChange(e)}
                value={localState.comment}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-b "></td>

          <td className="focus-within:bg-none focus:bg-none bg-none focus-within:bg-transparent bg-transparent focus:bg-white">
            <button onClick={saveHouseData}>
              <Image src={plus} height={30} alt="plus"></Image>
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            Add New Houses:{" "}
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="streetAd">
              {" "}
              <input
                name="streetAd"
                type="text"
                placeholder={"Add StreetAd"}
                value={""}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="direction">
              {" "}
              <input
                name="direction"
                type="text"
                placeholder={"Add Direction"}
                value={""}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200 ">
            <SelectObservation
              uniqueOption={localState.observation}
              options={observationValues}
              houseID={200}
              setLocalState={setLocalState}
              handleChange={handleChange}
              localState={localState}
              isEditable={props.isEditable}
            />
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="comment">
              {" "}
              <input
                name="comment"
                type="text"
                placeholder={"Add Comment"}
                value={""}
              />
            </label>
          </td>
          <td className="py-1 px-2 border-b "></td>
        </>
      )}
    </tr>
  );
});
AddHouseRow.displayName = "HouseRow";
export default AddHouseRow;
