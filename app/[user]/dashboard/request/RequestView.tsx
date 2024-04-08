"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState, createContext } from "react";
import Approval from "./Approval";
import { useStateContext } from "./StateContext";
// export default function RequestView(props) {
//   const context = useStateContext();

//   if (!context) {
//     return <div>Loading ...</div>;
//   }
//   const { territories, requests, updateItems } = context;

//   useEffect(() => {
//     updateItems();
//   }, [updateItems]);

//   if (!territories || !requests) {
//     console.log("wtf");
//     return <div>Loading territory data...</div>;
//   }
//   return territories.map((element, index) => (
//     <table key={index} className="w-full m-auto border-collapse text-center">
//       <thead>
//         <tr>
//           <th className="border-b border-gray-200 py-4 px-4">
//             Approval Status
//           </th>
//           <th className="border-b border-gray-200 py-4 px-4">Territory ID</th>

//           <th className="border-b border-gray-200 py-4 px-4">House ID</th>
//           <th className="border-b border-gray-200 py-4 px-4">Observation</th>
//           <th className="border-b border-gray-200 py-4 px-4">Comment</th>
//         </tr>
//       </thead>
//       <tbody>
//         {requests[0].map((element) => (
//           <tr key={element.id}>
//             <td className="border-t border-gray-200 py-4 px-4">
//               <Approval
//                 reqID={element.id}
//                 territoryID={element.territoryID}
//                 houseID={element.houseID}
//                 congregationID={element.congregationID}
//                 observation={element.observation}
//                 comment={element.comment}
//               ></Approval>
//             </td>
//             <td className="border-t border-gray-200 py-4 px-4">
//               {element.territoryID}
//             </td>
//             <td className="border-t border-gray-200 py-4 px-4">
//               {element.houseID}
//             </td>
//             <td className="border-t border-gray-200 py-4 px-4">
//               {element.observation}
//             </td>
//             <td className="border-t border-gray-200 py-4 px-4">
//               {element.comment}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   ));
// }
export default function RequestView(props) {
  const context = useStateContext();
  const { data: session, status } = useSession();
  if (!context) {
    return <div>Loading...</div>;
  }

  const { territories, requests, updateItems } = context;

  useEffect(() => {
    updateItems();
  }, [updateItems]);

  // Check if territories or requests are not loaded or if requests array is empty
  if (!territories || !requests || requests.length === 0) {
    return <div>Loading Request data...</div>;
  }

  // Now we are sure requests array is not empty, but ensure each item is as expected
  const territoriesResults = territories.map((element, index) => {
    // Assuming each territory corresponds to a set of requests
    const territoryRequests = requests[index];
    // Safely check if territoryRequests is not undefined and is an array
    if (!territoryRequests || !Array.isArray(territoryRequests)) {
      return null; // or some placeholder indicating no data for this territory
    }
    if (element.currentUser.id !== session?.user.id) {
      return;
    }

    return (
      <div key={index}>
        <div className=" text-2xl font-medium text-gray-500">
          Territory {element.territoryID}
        </div>
        <table
          key={index}
          className="w-full m-auto border-collapse text-center"
        >
          <thead>
            <tr>
              <th className="border-b border-gray-200 py-4 px-4">
                Approval Status
              </th>
              <th className="border-b border-gray-200 py-4 px-4">House ID</th>
              <th className="border-b border-gray-200 py-4 px-4">
                Observation
              </th>
              <th className="border-b border-gray-200 py-4 px-4">Comment</th>
            </tr>
          </thead>
          <tbody>
            {territoryRequests.map((element) => (
              <tr key={element.id}>
                <td className="border-t border-gray-200 py-4 px-4">
                  <Approval
                    reqID={element.id}
                    territoryID={element.territoryID}
                    houseID={element.houseID}
                    congregationID={element.congregationID}
                    observation={element.observation}
                    comment={element.comment}
                  ></Approval>
                </td>

                <td className="border-t border-gray-200 py-4 px-4">
                  {element.houseID}
                </td>
                <td className="border-t border-gray-200 py-4 px-4">
                  {element.observation}
                </td>
                <td className="border-t border-gray-200 py-4 px-4">
                  {element.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
  if (
    territoriesResults.every(
      (result) => result === null || result === undefined
    )
  ) {
    return (
      <div>
        Looks like you have no territories to accept Requests! Contact your
        administrator if you need assistance
      </div>
    );
  } else {
    return territoriesResults;
  }
}
