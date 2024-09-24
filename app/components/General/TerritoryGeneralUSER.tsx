import { Observation, Territory, Status, House, User } from "@prisma/client";
import cancel from "../../public/images/cancel.svg";
import check1 from "../../public/images/check1.svg";
import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import check from "../../public/images/check1.svg";
import HouseRow from "./HouseRowUser";
import { TerritoryCheckProps, TerritoryEditAdmin } from "@/app/types/common";
import "./styles.css";
export default function TerritoryGeneralUserView(props: TerritoryCheckProps) {
  const [val, setVal] = useState<Territory | null>(null);
  const [houses, setHouses] = useState<House[] | null>(null);
  const [user, setUser] = useState<User[] | null>(null);
  const [editableHouseID, setEditableHouseID] = useState<number | null>(null);
  const [update, setUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const makeEditable = useCallback((houseID: number) => {
    setEditableHouseID(houseID);
  }, []);
  useEffect(() => {
    async function brv() {
      const res = await fetch(`/api/territory?congID=${props.congID}&terrID=${props.territoryID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res1 = await res.json();
      setVal(res1);

      if (!res1 || !res1.currentUserID) {
        // console.log("currentUserID is null or undefined", res1);
        return; // Stop execution if currentUserID is not found
      }

      const res2 = await fetch(
        `/api/house?congID=${props.congID}&territoryID=${props.territoryID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res3 = await res2.json();
      setHouses(res3);

      // console.log("Check After Setting House", res1.currentUserID);

      // Use res1.currentUserID directly
      const res4 = await fetch(`/api/user?id=${res1.currentUserID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Check after fetching user");
      const res5 = await res4.json();
      setUser(res5);
    }
    brv();
  }, [update, props.congID, props.territoryID]); // Ensure 'update' is the correct dependency

  if (!val || !houses || !user) {
    return <h1>Checking Territory...</h1>;
  }
  console.log("Houses...", houses);
  // console.log("user: ", user);
  return (
    <div className="min-w-[65rem]">
      <div className="table">
        <table className="table md:text-base text-[.75rem]/[1.25rem]">
          <colgroup>
            <col className=" w-[13%]" />
            <col className=" w-[14%]" />
            <col className=" w-[22%]" />
            <col className=" w-[15%]" />
            <col className=" w-[16%]" />
            <col className=" w-[7%]" />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={5} className="bg-blue-400 border-b border-gray-200 py-4 px-4">
                REGISTRO DE CASA EN CASA
              </th>
            </tr>
            <tr className="bg-blue-200  border-gray-200 py-4 px-4">
              <th className="border-r border-b border-gray-200">Calles</th>
              <th colSpan={2} className="border-r border-b border-gray-200">
                <label htmlFor="" className=" ">
                  {val.location}
                </label>
              </th>

              <th colSpan={2} className="py-2 px-4 border-b border-gray-200">
                TERRITORIO: {val.territoryID}
              </th>
            </tr>
            <tr className="bg-blue-200  border-gray-200 py-4 px-4">
              <th className="border-r border-b border-gray-200 py-1 px-2 ">Encargado:</th>
              <th className="py-1 px-2 border-r border-b border-gray-200" colSpan={2}>
                {user[0].name}
              </th>

              <th colSpan={2} className="py-1 px-2 border-r border-b border-gray-200">
                Expira:{" "}
                {val.ExperiationDate
                  ? new Date(val.ExperiationDate).toLocaleDateString("en-US")
                  : "No Expiration Date"}
              </th>
            </tr>
            <tr className="bg-blue-200">
              <th className=" px-2 border-r border-gray-200">Actualización:</th>
              <th colSpan={4} className=" px-2">
                {val.activity}
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className=" bg-blue-400 text-black underline font-bold">
              <td className="py-1 px-2 border-r border-gray-200">Direccion</td>
              <td className="py-1 px-2 border-r border-gray-200">Calle</td>
              <td className="py-1 px-2 border-r border-gray-200">Observacion</td>
              <td className="py-1 px-2 border-r border-gray-200">Comentario</td>

              <td className="py-1 px-2">Fecha de Visita</td>
            </tr>
            {houses
              .slice() // Create a shallow copy of the array to avoid mutating the original array
              .sort((a, b) => a.houseID - b.houseID) // Sort the copy based on houseID
              .map((element) => (
                <HouseRow
                  key={element.houseID}
                  house={element}
                  makeEditable={makeEditable}
                  isEditable={editableHouseID === element.houseID}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const invertedObservationMapping: { [key in Observation]: string } = {
  [Observation.EMPTY]: "",
  [Observation.NO_LLEGAR]: "No llegar",
  [Observation.INGLES]: "Ingles",
  [Observation.OTRO_IDIOMA]: "Otro Idioma",
  [Observation.DUERME_DE_DIA]: "Duerme de dia",
  [Observation.VARON_VISITA]: "Varon visita",
  [Observation.PERRO_AFUERA]: "Perro afuera",
  [Observation.PERRO_EN_CASA]: "Perro en casa",
  [Observation.TESTIGOS]: "Testigos",
  [Observation.VIOLENTO]: "Violento",
  [Observation.NO_TRASPASAR]: "No traspasar",
  [Observation.CANDADO]: "Candado",
  // Add other mappings as necessary
};
