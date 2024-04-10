import { Observation, Territory, Status } from "@prisma/client";

import cancel from "../../public/images/cancel.svg";
import check1 from "../../public/images/check1.svg";
import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import check from "../../public/images/check1.svg";
import HouseRow from "./HouseRow";
import AddHouseRow from "./AddHouseRow";
export default function TerritoryGeneralView(props) {
  const [val, setVal] = useState(null);
  const [houses, setHouses] = useState(null);
  const [user, setUser] = useState(null);
  const [editableHouseID, setEditableHouseID] = useState(null);
  const [update, setUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const makeEditable = useCallback((houseID) => {
    setEditableHouseID(houseID);
  }, []);
  useEffect(() => {
    async function brv() {
      const res = await fetch(
        `/api/territory?congID=${props.congID}&terrID=${props.territoryID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res1 = await res.json();
      setVal(res1);

      if (!res1 || !res1.currentUserID) {
        console.log("currentUserID is null or undefined", res1);
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

      console.log("Check After Setting House", res1.currentUserID);

      // Use res1.currentUserID directly
      const res4 = await fetch(`/api/user?id=${res1.currentUserID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Check after fetching user");
      const res5 = await res4.json();
      setUser(res5);
    }
    brv();
  }, [update]); // Ensure 'update' is the correct dependency

  if (!val || !houses || !user) {
    return <h1>Checking Territory...</h1>;
  }
  console.log("user: ", user);
  return (
    <div className="overflow-x-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th
              colSpan={6}
              className="bg-blue-400 border-b border-gray-200 py-4 px-4"
            >
              REGISTRO DE CASA EN CASA
            </th>
          </tr>
          <tr className="bg-blue-200  border-gray-200 py-4 px-4">
            <th className="border-r border-b border-gray-200">Calles</th>
            <th colSpan={2} className="border-r border-b border-gray-200">
              <label htmlFor="" className=" ">
                <input
                  type="text"
                  className="bg-blue-200 border-black border-2 border-y-2"
                  placeholder={val.location}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                ></input>
              </label>
              <button
                onClick={(e) => {
                  console.log(e);
                }}
                className="ml-3"
              >
                <div className="w-7 h-7 hover:fill-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2340.71 2340.72"
                    className=" fill-[#84c731] hover:fill-black"
                  >
                    <defs></defs>
                    <title>Asset 1</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path d="M1170.36,2340.72c-158,0-311.24-31-455.59-92A1174.26,1174.26,0,0,1,92,1625.94C31,1481.6,0,1328.32,0,1170.36S31,859.12,92,714.77A1174.19,1174.19,0,0,1,714.77,92C859.12,31,1012.4,0,1170.36,0s311.24,31,455.58,92a1174.26,1174.26,0,0,1,622.77,622.76c61.05,144.35,92,297.63,92,455.59s-30.95,311.24-92,455.58a1174.32,1174.32,0,0,1-622.77,622.77c-144.34,61.05-297.62,92-455.58,92m0-2171.22c-551.88,0-1000.86,449-1000.86,1000.86s449,1000.85,1000.86,1000.85,1000.85-449,1000.85-1000.85S1722.23,169.5,1170.36,169.5" />
                        <path d="M1719,683,996.93,1405.1a11.65,11.65,0,0,1-16.49,0L616,1040.69a11.67,11.67,0,0,0-16.49,0L423.17,1217.05a11.67,11.67,0,0,0,0,16.49l560.54,560.54a11.67,11.67,0,0,0,16.49,0l181.62-181.62,3-3,730.33-730.34a11.65,11.65,0,0,0,0-16.49L1735.51,683a11.67,11.67,0,0,0-16.49,0" />
                      </g>
                    </g>
                  </svg>
                </div>
              </button>
            </th>

            <th colSpan={3} className="py-2 px-4 border-b border-gray-200">
              TERRITORIO: {val.territoryID}
            </th>
          </tr>
          <tr className="bg-blue-200  border-gray-200 py-4 px-4">
            <th className="border-r border-b border-gray-200 py-1 px-2 ">
              Encargado:
            </th>
            <th
              className="py-1 px-2 border-r border-b border-gray-200"
              colSpan={2}
            >
              {user[0].name}
            </th>

            <th
              colSpan={2}
              className="py-1 px-2 border-r border-b border-gray-200"
            >
              Expira:
            </th>
            <th className="py-1 border-b px-2">
              {val.ExperiationDate
                ? new Date(val.ExperiationDate).toLocaleDateString("en-US")
                : "No Expiration Date"}
            </th>
          </tr>
          <tr className="bg-blue-200">
            <th className=" px-2 border-r border-gray-200">Actualización:</th>
            <th colSpan={5} className=" px-2">
              {val.activity}
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr className=" bg-blue-400 text-black underline font-bold">
            <td className="py-1 px-2 border-r border-gray-200">Status</td>

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
          <AddHouseRow
            key={200}
            makeEditable={makeEditable}
            isEditable={editableHouseID === 200}
            territoryID={props.territoryID}
            update={update}
            setUpdate={setUpdate}
          ></AddHouseRow>
        </tbody>
      </table>
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
