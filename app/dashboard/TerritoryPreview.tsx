import { table } from "console";

export default function TerritoryPreview({ terrList }) {
  return (
    <table className="w-full m-auto border-collapse text-center">
      <thead>
        <tr>
          <th className="border-b border-gray-200 py-4 px-4">Territory</th>
          <th className="border-b border-gray-200 py-4 px-4">Location</th>
          <th className="border-b border-gray-200 py-4 px-4">Assigned Date</th>
          <th className="border-b border-gray-200 py-4 px-4">
            Expiration Date
          </th>
        </tr>
      </thead>
      <tbody>
        {terrList.map((element) => (
          <tr key={element.id}>
            <td className="border-t border-gray-200 py-4 px-4">{element.id}</td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.address}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.initial}
            </td>
            <td className="border-t border-gray-200 py-4 px-4">
              {element.expiration}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
