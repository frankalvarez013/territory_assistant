import { Observation, Territory, Status, House, TerritoryCounter, User } from "@prisma/client";
import SelectObservation from "../Interact/SelectObservation";
import { useEffect, useState } from "react";
import { TerritoryEditAdmin, TerritoryWithHouses } from "@/app/types/common";
import "./styles.css";
type terrcongProps = {
  territoryID: string;
  congID: string;
};
export default function TerritoryGeneralView(props: terrcongProps) {
  const [territory, setTerritory] = useState<TerritoryWithHouses | null>(null);
  const [user, setUser] = useState<User[] | null>(null);
  useEffect(() => {
    async function brv() {
      const res = await fetch(`/api/territory?congID=${props.congID}&terrID=${props.territoryID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res1 = await res.json();
      setTerritory(res1);
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
  }, [props.congID, props.territoryID]);
  if (!territory || !user) {
    return <h1>Checking Territory...</h1>;
  }
  const observationValues: Observation[] = Object.values(Observation);
  return (
    <div className="min-w-[35rem]">
      <div className="table ">
        <table className="table md:text-base text-[.75rem]/[1.25rem]">
          <colgroup>
            <col className="w-[13%]" />
            <col className="w-[14%]" />
            <col className="w-[22%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={5} className="bg-blue-400 border-b border-gray-200 py-4 px-4">
                REGISTRO DE CASA EN CASA
              </th>
            </tr>
            <tr className="bg-blue-200 border-b border-gray-200 py-4 px-4">
              <th className="border-r border-gray-200">
                <b>Calles</b>
              </th>
              <th colSpan={2} className="border-r border-gray-200">
                {territory.location}
              </th>

              <th colSpan={2} className="py-2 px-4 border-l border-gray-200  ">
                <b>TERRITORIO:</b> {territory.territoryID}
              </th>
            </tr>
            <tr className="bg-blue-200 border-l border-b border-gray-200 py-4 px-4">
              <th className="border-r border-gray-200 py-1 px-2 ">Encargado:</th>
              <th className="py-1 px-2 border-r border-gray-200" colSpan={2}>
                {user[0].name}
              </th>

              <th colSpan={2} className="py-1 px-2 border-r border-gray-200">
                Expira:{" "}
                {territory.ExperiationDate
                  ? new Date(territory.ExperiationDate).toLocaleDateString("en-US")
                  : "No Expiration Date"}
              </th>
            </tr>
            <tr className="bg-blue-200">
              <th className=" px-2 border-r border-gray-200">Actualización:</th>
              <th colSpan={4} className=" px-2">
                {territory.activity}
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
            {territory.houses
              .slice() // Create a shallow copy of the array to avoid mutating the original array
              .sort((a: House, b: House) => a.houseID - b.houseID) // Sort the copy based on houseID
              .map((element: House) => {
                return (
                  <tr key={element.houseID} className=" border-b border-gray-200 ">
                    <td className="py-1 px-2 border-r border-gray-200 flex">
                      <div className="">
                        {" "}
                        {element.status === Status.LLEGA
                          ? element.observation === Observation.CANDADO ||
                            element.observation === Observation.EMPTY ||
                            element.observation === Observation.PERRO_EN_CASA
                            ? "🟢"
                            : "🔴"
                          : "🔴"}
                      </div>
                      {element.StreetAd}
                    </td>
                    <td className="py-1 px-2 border-r border-gray-200 min-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis ">
                      {element.Direction}
                    </td>
                    <td className="py-1 px-2 border-r border-gray-200 ">
                      <SelectObservation
                        uniqueOption={element.observation}
                        options={observationValues}
                        territoryID={territory.territoryID.toString()}
                        congregationID={territory.congregationID}
                        houseID={element.houseID.toString()}
                      />
                    </td>
                    <td className="py-1 px-2 border-r border-gray-200">{element.comment}</td>
                    <td className="py-1 px-2">
                      {element.dateVisited
                        ? new Date(element.dateVisited).toLocaleDateString("en-US", {
                            /* formatting options here */
                          })
                        : ""}
                    </td>
                  </tr>
                );
              })}
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
