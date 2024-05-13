import { Observation, Territory } from "@prisma/client";
import { useSession } from "next-auth/react";
import { TerritoryProps } from "../../types/common";
import SelectObservation from "../Interact/SelectObservation";
import { CustomSession } from "@/app/types/api";
export default function TerritoryPreview(props: TerritoryProps) {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const observationValues: Observation[] = Object.values(Observation);
  return (
    <div className="overflow-x-auto">
      <table className="table-auto">
        <thead>
          <tr>
            <th colSpan={5} className="bg-blue-400 border-b border-gray-200 py-4 px-4">
              REGISTRO DE CASA EN CASA
            </th>
          </tr>
          <tr className="bg-blue-200 border-b border-gray-200 py-4 px-4">
            <th className="border-r border-gray-200">Calles</th>
            <th colSpan={2} className="border-r border-gray-200">
              {props.territory.location}
            </th>
            <th colSpan={2} className="py-2 px-4 border-l border-gray-200">
              TERRITORIO: {props.territory.territoryID}
            </th>
          </tr>
          <tr className="bg-blue-200 border-l border-b border-gray-200 py-4 px-4">
            <th className="border-r border-gray-200 py-1 px-2 ">Encargado:</th>
            <th className="py-1 px-2 border-r border-gray-200" colSpan={2}>
              {session?.user?.name ?? "Guest"}
            </th>

            <th className="py-1 px-2 border-r border-gray-200">Expira:</th>
            <th className="py-1 px-2">
              {props.territory.ExperiationDate
                ? new Date(props.territory.ExperiationDate).toLocaleDateString("en-US")
                : "No Expiration Date"}
            </th>
          </tr>
          <tr className="bg-blue-200">
            <th className=" px-2 border-r border-gray-200">Actualización:</th>
            <th colSpan={4} className=" px-2">
              {props.territory.activity}
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
          {props.territory.houses.map((element) => {
            return (
              <tr key={element.houseID} className=" border-b border-gray-200 ">
                <td className="py-1 px-2 border-r border-gray-200">{element.StreetAd}</td>
                <td className="py-1 px-2 border-r border-gray-200">{element.Direction}</td>
                <td className="py-1 px-2 border-r border-gray-200">
                  <SelectObservation
                    uniqueOption={element.observation}
                    options={observationValues}
                    territoryID={props.territory.territoryID.toString()}
                    congregationID={session?.user?.congID || "0"}
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
  );
}
