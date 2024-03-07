interface House {
  territoryID: any; // Replace `any` with a more specific type if possible
  StreetAd?: string;
  direction?: string;
  comment?: string;
  observation?: string;
}
export default async function createExcelTerritory(sheetID, sheetName) {
  try {
    const response = await fetch("/api/sheets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sheetID: sheetID,
        sheetName: sheetName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update territory");
    }

    // Optionally, refresh your local data to reflect the change
    console.log("Territory updated successfully");
    const data = await response.json();

    const createTerritory = await fetch("/api/territory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: data.values[2][2],
      }),
    });
    const territory = await createTerritory.json();
    const totalObj = parseSheet(data.values, territory);
    console.log("Houses Parsed Successfully ", totalObj);
  } catch (error) {
    console.error(error);
  }
}

function parseSheet(data, territory) {
  const houses: House[] = data.slice(6, data.length - 1).map((item) => {
    const obj: House = {
      territoryID: territory.territoryID,
    };

    // Conditionally add properties if they exist in the item array
    if (item[1] !== undefined) obj.StreetAd = item[1];
    if (item[2] !== undefined) obj.direction = item[2];
    if (item[3] !== undefined) obj.comment = item[3];
    if (item[4] !== undefined) obj.observation = item[4];
    return obj;
  });

  return houses;
}
