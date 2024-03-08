import { useSession } from "next-auth/react";
export default function TerritoryPreview(props) {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession();
  return (
    <div className="overflow-x-auto">
      update{" "}
      <table className="table-auto">
        <thead>
          <tr>
            <th
              colSpan={5}
              className="bg-blue-400 border-b border-gray-200 py-4 px-4"
            >
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
              {session?.user.name}
            </th>

            <th className="py-1 px-2 border-r border-gray-200">Expira:</th>
            <th className="py-1 px-2">
              {new Date(props.territory.ExperiationDate).toLocaleDateString(
                "en-US"
              )}
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
                <td className="py-1 px-2 border-r border-gray-200">
                  {element.StreetAd}
                </td>
                <td className="py-1 px-2 border-r border-gray-200">
                  {element.Direction}
                </td>
                <td className="py-1 px-2 border-r border-gray-200">
                  {element.observation}
                </td>
                <td className="py-1 px-2 border-r border-gray-200">
                  {element.comment}
                </td>
                <td className="py-1 px-2">{element.dateVisited}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
