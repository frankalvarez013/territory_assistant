import { table } from "console";

export default function TerritoryPreview({ terrList }) {
  return (
    <table className="w-full m-auto border-collapse border-spacing-6">
      <thead className="mb-5">
        <tr className="">
          <th className="border-b border-gray-200 p-2 text-left">Territory</th>
          <th className="border-b border-gray-200 p-2">Location</th>
          <th className="border-b border-gray-200 p-2">Assigned Date</th>
          <th className="border-b border-gray-200 p-2">Expiration Date</th>{" "}
          {/* Corrected typo */}
        </tr>
      </thead>
      <tbody>
        {terrList.map((element) => (
          <tr className="" key={element.id}>
            <td className="border-t border-gray-200 p-2">{element.id}</td>
            <td className="border-t border-gray-200 p-2 text-center">
              {element.address}
            </td>
            <td className="border-t border-gray-200 p-2 text-center">
              {element.initial}
            </td>
            <td className="border-t border-gray-200 p-2 text-center">
              {element.expiration}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
