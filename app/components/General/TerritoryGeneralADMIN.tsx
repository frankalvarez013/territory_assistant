import { Observation, Territory, Status } from "@prisma/client";
import SelectObservation from "../Interact/SelectObservationADMIN";
import cancel from "../../public/images/cancel.svg";
import check1 from "../../public/images/check1.svg";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
export default function TerritoryGeneralView(props) {
  const [focusedRow, setFocusedRow] = useState(null);
  const [val, setVal] = useState(null);
  const focusedRowClass =
    "focus:border-sky-500 focus:ring-1 focus:ring-sky-500 bg-black";
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
    }
    brv();
  }, []);
  const observationValues = useMemo(() => Object.values(Observation), []);
  if (!val) {
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
          {val.houses.map((element) => {
            return (
              <tr
                key={element.houseID}
                tabIndex={0}
                className=" border-gray-200 focus-within:bg-slate-400 focus-within:outline-none"
                onClick={() => {}}
              >
                <td className="py-1 px-2 border-r border-gray-200">
                  {element.status === Status.LLEGA
                    ? element.observation === Observation.CANDADO ||
                      element.observation === Observation.EMPTY ||
                      element.observation === Observation.PERRO_EN_CASA
                      ? "🟢"
                      : "🔴"
                    : "🔴" || "🔴"}
                </td>
                <td className="py-1 px-2 border-r border-b border-gray-200">
                  <label htmlFor="streetAd">
                    {" "}
                    <input
                      name="streetAd"
                      type="text"
                      placeholder={element.StreetAd}
                    />
                  </label>
                </td>
                <td className="py-1 px-2 border-r border-b border-gray-200">
                  <label htmlFor="direction">
                    {" "}
                    <input
                      name="direction"
                      type="text"
                      placeholder={element.Direction}
                    />
                  </label>
                </td>
                <td className="py-1 px-2 border-r border-b border-gray-200 ">
                  <SelectObservation
                    uniqueOption={element.observation}
                    options={observationValues}
                    territoryID={val.territoryID.toString()}
                    congregationID={val.congregationID}
                    userID={val.currentUserID}
                    houseID={element.houseID.toString()}
                  />
                </td>
                <td className="py-1 px-2 border-r border-b border-gray-200">
                  <label htmlFor="comment">
                    {" "}
                    <input
                      name="comment"
                      type="text"
                      placeholder={element.comment}
                    />
                  </label>
                </td>
                <td className="py-1 px-2 border-b ">
                  {element.dateVisited
                    ? new Date(element.dateVisited).toLocaleDateString(
                        "en-US",
                        {
                          /* formatting options here */
                        }
                      )
                    : ""}
                </td>

                <td className="focus-within:bg-none focus:bg-none bg-none">
                  <button
                    className="border-black border-2 rounded-2xl px-1 "
                    onClick={(e) => console.log("HEY")}
                  >
                    Save
                  </button>
                </td>
              </tr>
            );
          })}
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
