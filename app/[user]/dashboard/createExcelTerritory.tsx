import { Observation, Territory } from "@prisma/client";
interface House {
  territoryID: any; // Replace `any` with a more specific type if possible
  StreetAd?: string;
  Direction?: string;
  comment?: string;
  observation?: Observation;
}
const observationMapping: { [key: string]: Observation } = {
  "": Observation.EMPTY,
  "No llegar": Observation.NO_LLEGAR,
  "Ingles": Observation.INGLES,
  "Otro Idioma": Observation.OTRO_IDIOMA,
  "Duerme de dia": Observation.DUERME_DE_DIA,
  "Varon visita": Observation.VARON_VISITA,
  "Perro afuera": Observation.PERRO_AFUERA,
  "Perro en casa": Observation.PERRO_EN_CASA,
  "Testigos": Observation.TESTIGOS,
  "Violento": Observation.VIOLENTO,
  "No traspasar": Observation.NO_TRASPASAR,
  "Candado": Observation.CANDADO,
  // Add other mappings as necessary
};
export default async function createExcelTerritory(
  sheetID: string,
  sheetName: string,
  territoryID: string
) {
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
        territoryID: territoryID,
        location: data.values[2][2],
      }),
    });
    if (!createTerritory.ok) {
      throw new Error(`Failed to create territory: ${createTerritory.statusText}`);
    }
    const territory = await createTerritory.json();
    const totalObj = parseSheet(data.values, territory);

    console.log("Houses Parsed Successfully ", totalObj);
    sendRequestsSequentially(totalObj);
  } catch (error) {
    console.error(error);
  }
}

function parseSheet(data: [], territory: Territory) {
  const houses: House[] = data.slice(6, data.length - 1).map((item) => {
    const obj: House = {
      territoryID: territory.territoryID,
    };

    // Conditionally add properties if they exist in the item array
    if (item[1] !== undefined) obj.StreetAd = item[1];
    if (item[2] !== undefined) obj.Direction = item[2];
    item[3] !== undefined
      ? (obj.observation = observationMapping[item[3]])
      : (obj.observation = Observation.EMPTY);
    if (item[4] !== undefined && item[4] !== "") obj.comment = item[4];
    return obj;
  });

  return houses;
}
const postData = async (data: House) => {
  try {
    const response = await fetch("/api/house", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json(); // or response.text() if the response is not in JSON format
  } catch (error) {
    console.error("Error:", error);
  }
};
const sendRequestsSequentially = async (dataArray: House[]) => {
  for (const item of dataArray) {
    const response = await postData(item);
    console.log(response); // Process response as needed
  }
};
