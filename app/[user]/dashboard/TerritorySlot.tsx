import React, { useState, memo } from "react";
import patchTerrOwner from "../../components/fetch/patchTerrOwner";
import SelectComponent from "../../components/Interact/selectTerrOwner";
import { TerritoryComment, User } from "@prisma/client";
import { formatDate } from "@/app/utils/functions";
import { ExtendedTerritory } from "@/app/types/common";

type terr = { element: ExtendedTerritory; users: User[]; dateLength: string };
const TerritorySlot = memo(function TerritoryItem({ element, users, dateLength }: terr) {
  const [expirationDate, setExpirationDate] = useState(
    element.ExperiationDate ? formatDate(element.ExperiationDate) : ""
  );

  const handleAssignedDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const assignedDate = e.currentTarget.valueAsDate;

    if (assignedDate) {
      const daysToAdd = parseInt(dateLength, 10);
      const newExpirationDate = new Date(assignedDate);
      newExpirationDate.setDate(newExpirationDate.getDate() + daysToAdd + 1);
      setExpirationDate(formatDate(newExpirationDate));

      patchTerrOwner(
        element.territoryID,
        element.currentUser.id,
        element.congregationID,
        dateLength,
        assignedDate
      );
    }
  };

  return (
    <div
      key={element.territoryID}
      className={`mb-4 p-4 border rounded-lg min-w-44 ${
        element.activity === TerritoryComment.Available ? "bg-green-200" : ""
      }`}
    >
      <div className="mb-2 flex ">
        <strong>Territory:</strong>
        <a
          href={`/territory/${element.congregationID}/${element.territoryID}`}
          className="hover:underline hover:to-blue-300"
        >
          {element.territoryID}
        </a>
      </div>
      <div className="mb-2">
        <strong>Publisher:</strong>
        <SelectComponent
          uniqueOption={
            element.currentUser && !element.currentUser.isAdmin
              ? element.currentUser
              : { id: element.currentUser?.id ?? "", name: "Add a User" }
          }
          options={users}
          territoryId={element.territoryID}
          congregationId={element.congregationID}
        />
      </div>
      <div className="mb-2">
        <strong>Assigned Date:</strong>
        <input
          type="date"
          className="border-2 px-2 border-gray-200 rounded-full"
          defaultValue={
            element.AssignedDate ? new Date(element.AssignedDate).toISOString().split("T")[0] : ""
          }
          onChange={handleAssignedDateChange}
        />
      </div>
      <div className="mb-2">
        <strong>Expiration Date:</strong>
        {expirationDate || "..."}
      </div>
      <div className="mb-2">
        <strong>Comments:</strong> {element.activity}
      </div>
    </div>
  );
});

export default TerritorySlot;
