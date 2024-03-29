import { Observation, Territory, Status } from "@prisma/client";

import cancel from "../../public/images/cancel.svg";
import check1 from "../../public/images/check1.svg";
import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import HouseRow from "./HouseRow";
import AddHouseRow from "./AddHouseRow";
export default function TerritoryGeneralView(props) {
  const [val, setVal] = useState(null);
  const [houses, setHouses] = useState(null);
  const [editableHouseID, setEditableHouseID] = useState(null);
  const [update, setUpdate] = useState(false);
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
    }
    brv();
  }, [update]);
  if (!val || !houses) {
    return <h1>Checking Territory...</h1>;
  }
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
              {val.location}
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
              {val.currentUserID}
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
