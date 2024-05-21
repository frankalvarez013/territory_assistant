import { Observation } from "@prisma/client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import SelectObservation from "../Interact/SelectAddObservation";
import fetchAddHouse from "../fetch/fetchAddHouse";
import plus from "../../public/images/plus.svg";
import Image from "next/image";
import ErrorParser from "@/app/utils/ErrorParse";
import { HouseErrorFormHandler } from "@/app/types/error";
import { AddHouseRowProps, LocalState } from "@/app/types/common";
const AddHouseRow = React.memo((props: AddHouseRowProps) => {
  const [errorFormHandler, setErrorFormHandler] = useState<HouseErrorFormHandler>({});
  const [localState, setLocalState] = useState<LocalState>({
    Direction: "",
    observation: Observation.EMPTY,
    StreetAd: "",
    comment: "",
    dateVisited: "",
  });
  const observationValues = useMemo(() => Object.values(Observation), []);
  const saveHouseData = async () => {
    setErrorFormHandler({});
    if (!localState.StreetAd) {
      setErrorFormHandler({ StreetAd: true, error: "Please input a valid value" });
      return;
    }
    if (!localState.Direction) {
      setErrorFormHandler({ Direction: true, error: "Please input a valid value" });

      return;
    }
    if (!localState.StreetAd || !localState.StreetAd.trim())
      localState.StreetAd = localState.StreetAd;
    if (!localState.Direction || !localState.Direction.trim())
      localState.Direction = localState.Direction;
    if (!localState.comment || !localState.comment.trim()) localState.comment = localState.comment;
    console.log("Saving", localState, "terrID: ", props.territoryID);
    const res = await fetchAddHouse(
      parseInt(props.territoryID),
      localState.Direction,
      localState.StreetAd,
      localState.comment,
      localState.observation,
      undefined
    );
    //!!!!!!!!!!!!!!!!Remember This is where you left off,
    //You have to add Error Handling for this page and for the fetch itself, and prob the route as well...
    //to be continued
    //In this case add Error handling for each tr tl comment
    if (!res.success) {
      console.log("parsing....");
      const errorParts: {
        field: string | null;
        model: string | null;
      } | null = ErrorParser(res.error);
      console.log("Error Field:", errorParts);
      if (errorParts && errorParts.model && errorParts.field) {
        setErrorFormHandler({
          [errorParts.model]: errorParts.model,

          [errorParts.field]: errorParts.field,

          error: `Login Failed`,
        });
      }
    } else {
      props.setUpdate(!props.update);
    }
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            <label htmlFor="direction">
              {" "}
              <input
                name="StreetAd"
                type="text"
                placeholder={"Add StreetAd"}
                onChange={(e) => handleChange(e)}
                value={localState.StreetAd}
                required
              />
              {errorFormHandler.StreetAd && (
                <p className="text-red-500 text-xs italic">{errorFormHandler.error}</p>
              )}
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
                required
              />
              {errorFormHandler.Direction && (
                <p className="text-red-500 text-xs italic">{errorFormHandler.error}</p>
              )}
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200 ">
            <SelectObservation
              uniqueOption={localState.observation}
              options={observationValues}
              houseID={`200`}
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
          <td></td>
          <td className="focus-within:bg-none focus:bg-none bg-none focus-within:bg-transparent bg-transparent focus:bg-white">
            <button onClick={saveHouseData}>
              <Image src={plus} height={30} alt="plus"></Image>
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="streetAd">
              {" "}
              <input name="streetAd" type="text" placeholder={"Add StreetAd"} value={""} />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="direction">
              {" "}
              <input name="direction" type="text" placeholder={"Add Direction"} value={""} />
            </label>
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200 ">
            <SelectObservation
              uniqueOption={localState.observation}
              options={observationValues}
              houseID={`200`}
              setLocalState={setLocalState}
              handleChange={handleChange}
              localState={localState}
              isEditable={props.isEditable}
            />
          </td>
          <td className="py-1 px-2 border-r border-b border-gray-200">
            <label htmlFor="comment">
              {" "}
              <input name="comment" type="text" placeholder={"Add Comment"} value={""} />
            </label>
          </td>
          <td className="py-1 px-2 "></td>
        </>
      )}
    </tr>
  );
});
AddHouseRow.displayName = "HouseRow";
export default AddHouseRow;
