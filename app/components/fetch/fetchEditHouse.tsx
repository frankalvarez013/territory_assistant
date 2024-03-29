//use zod to check if the isAdmin is true or false "strings"
export default async function fetchEditHouse(
  territoryID,
  congID,
  houseID,
  Direction,
  StreetAd,
  comment,
  observation,
  dateVisited
) {
  const res = await fetch(
    `/api/house?territoryID=${territoryID}&congregationID=${congID}&houseID=${houseID}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Direction,
        StreetAd,
        comment,
        observation,
        dateVisited,
      }),
    }
  );
  const res1 = await res.json();
  console.log(res1);
}
