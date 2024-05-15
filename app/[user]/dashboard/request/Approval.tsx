"use client";
import { ApprovalProps } from "@/app/types/common";
import { useStateContext } from "./StateContext";
import fetchAcceptRequest from "./fetchAcceptRequest";
import fetchDeleteRequest from "./fetchDeleteRequest";
import { ChangeEvent } from "react";
export default function Approval(props: ApprovalProps) {
  const { updateItems } = useStateContext();
  const handleAcceptChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "accept") {
      await fetchAcceptRequest(
        props.territoryID,
        props.houseID,
        props.congregationID,
        props.observation,
        props.comment,
        props.reqID
      );
    } else {
      await fetchDeleteRequest(props.reqID);
    }
    updateItems();
  };
  return (
    <fieldset className="text-black flex justify-center">
      <div className="flex items-start gap-8">
        <div>
          <input className=" mr-1" type="checkbox" id="accept" onChange={handleAcceptChange} />
          <label htmlFor="accept">Accept</label>
        </div>
        <div>
          <input className=" mr-1" type="checkbox" id="deny" onChange={handleAcceptChange} />
          <label htmlFor="deny">Deny</label>
        </div>
      </div>
    </fieldset>
  );
}
