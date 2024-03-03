export default function TerritoryPreview() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th colSpan={5} className="border-b border-gray-200 py-4 px-4">
              REGISTRO DE CASA EN CASA
            </th>
          </tr>
          <tr className="border-b border-gray-200 py-4 px-4">
            <th className="border-r border-gray-200">Calles</th>
            <th colSpan={2} className="border-r border-gray-200">
              Gifford ave/Fishburn Entre 58th St/Slauson Ave
            </th>
            <th colSpan={2} className="py-2 px-4 border-l border-gray-200">
              TERRITORIO: 46
            </th>
          </tr>
          <tr className="border-l border-b border-gray-200 py-4 px-4">
            <th className="border-r border-gray-200 py-1 px-2 ">Encargado:</th>
            <th className="py-1 px-2 border-r border-gray-200" colSpan={2}>
              Lizano, Erick
            </th>

            <th className="py-1 px-2 border-r border-gray-200">Expira:</th>
            <th className="py-1 px-2">4/29/2023</th>
          </tr>
          <tr>
            <th className=" px-2 border-r border-gray-200">Actualización:</th>
            <th className=" px-2">En vivo</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr className="bg-red-500 text-white">
            <td className="py-1 px-2 border-r border-gray-200">Direccion</td>
            <td className="py-1 px-2 border-r border-gray-200">Calle</td>
            <td className="py-1 px-2 border-r border-gray-200">Observacion</td>
            <td className="py-1 px-2 border-r border-gray-200">Comentario</td>
            <td className="py-1 px-2">Fecha de Visita</td>
          </tr>

          <tr>
            <td className="py-1 px-2 border-r border-gray-200">4102</td>
            <td className="py-1 px-2 border-r border-gray-200">58th St</td>
            <td className="py-1 px-2 border-r border-gray-200">Perro afuera</td>
            <td className="py-1 px-2 border-r border-gray-200"></td>
            <td className="py-1 px-2 border-r border-gray-200">8/27/2023</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
