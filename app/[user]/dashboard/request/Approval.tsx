"use client";
import fetchAcceptRequest from "./fetchAcceptRequest";
import fetchDeleteRequest from "./fetchDeleteRequest";
export default function Approval(props) {
  const handleAcceptChange = (event) => {
    if (event.target.id === "accept") {
      fetchAcceptRequest(
        props.territoryID,
        props.houseID,
        props.congregationID,
        props.observation,
        props.comment,
        props.reqID
      );
    } else {
      fetchDeleteRequest(props.reqID);
    }
  };
  return (
    <fieldset className="text-black flex justify-center">
      <div className="flex items-start gap-8">
        <div>
          <input
            className=" mr-1"
            type="checkbox"
            id="accept"
            onChange={handleAcceptChange}
          />
          <label htmlFor="accept">Accept</label>
        </div>
        <div>
          <input
            className=" mr-1"
            type="checkbox"
            id="deny"
            onChange={handleAcceptChange}
          />
          <label htmlFor="deny">Deny</label>
        </div>
      </div>
    </fieldset>
  );
}
