import React, { useState, memo } from "react";
import patchTerrOwner from "../../components/fetch/patchTerrOwner";
import SelectComponent from "../../components/Interact/selectTerrOwner";
import { TerritoryComment, User } from "@prisma/client";
import { formatDate } from "@/app/utils/functions";
import { ExtendedTerritory } from "@/app/types/common";

type terr = { element: ExtendedTerritory; users: User[]; dateLength: string };
const TerritoryCol = memo(function TerritoryItem({ element, users, dateLength }: terr) {
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
    <tr
      key={element.territoryID}
      className={`border-t border-gray-200 ${
        element.activity == TerritoryComment.Available ? "bg-green-200" : ""
      }`}
    >
      <td className="border-t border-gray-200 py-4 px-4 hover:underline hover:to-blue-300">
        <a href={`/territory/${element.congregationID}/${element.territoryID}`}>
          {element.territoryID}
        </a>
      </td>
      <td className="border-t border-gray-200 py-4 px-4">
        <SelectComponent
          uniqueOption={
            element.currentUser && !element.currentUser.isAdmin
              ? element.currentUser
              : { id: element.currentUser?.id ?? "", name: "Add a User" }
          }
          options={users}
          territoryId={element.territoryID}
          congregationId={element.congregationID}
        ></SelectComponent>
      </td>
      <td className="border-t border-gray-200 py-4 px-4">
        <input
          type="date"
          className=" border-2 px-2 border-gray-200 rounded-full"
          defaultValue={
            element.AssignedDate ? new Date(element.AssignedDate).toISOString().split("T")[0] : ""
          }
          onChange={handleAssignedDateChange}
        />
      </td>
      <td className="border-t border-gray-200 py-4 px-4">{expirationDate || "..."}</td>
      <td className="border-t border-gray-200 py-4 px-4">{element.activity}</td>
    </tr>
  );
});

export default TerritoryCol;
