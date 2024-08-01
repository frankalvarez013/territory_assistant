"use client";
import LoadingModal from "@/app/[user]/dashboard/LoadingModal";
import createExcelTerritory from "../../[user]/dashboard/createExcelTerritory";
import { FormEvent, useState } from "react";
type Question = {
  Question: string;
};
const Question = (props: Question) => {
  const [isHidden, setIsHidden] = useState(true);
  const [sheetID, setsheetID] = useState("");
  const [territoryID, setTerritoryID] = useState("");

  const [sheetName, setsheetName] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log(sheetID, sheetName);
    setLoadingModal(true);
    const res = await createExcelTerritory(sheetID, sheetName, territoryID);
    // window.location.reload();
  };
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
    // console.log(isHidden);
  };
  return (
    <div className="flex flex-col gap-2  max-w-96">
      <div
        className="flex justify-between hover:cursor-pointer hover:text-orangeJ"
        onClick={toggleVisibility}
      >
        <h3 className="font-light text-lg">{props.Question}</h3>
        {isHidden ? (
          <button className="bg-blue-300 rounded-3xl h-7 w-7">+</button>
        ) : (
          <button className="bg-blue-300 rounded-3xl h-7 w-7">-</button>
        )}
      </div>
      <div>
        {isHidden ? (
          <a className="pb-20 font-light text-light-grey1 hidden"></a>
        ) : (
          <form action="" className=" " onSubmit={handleSubmit}>
            <h1 className="text-black mb-4">
              Make sure you share the Service Account Email in the google sheets file or else it
              won&apos;t work.
            </h1>
            <h1>Service Account Email: generalserv@vast-reality-401722.iam.gserviceaccount.com</h1>
            <label htmlFor="sheetID" className="text-black font-semibold">
              Insert JUST the Google Sheet ID - see example in input bar
            </label>
            <br />
            <input
              className="w-full border-2 border-gray-500 rounded-xl p-1"
              type="text"
              id="sheetID"
              name="sheetID"
              placeholder="docs.google.com/spreadsheets/d/{sheetID}/"
              value={sheetID}
              onChange={(event) => {
                setsheetID(event.target.value);
              }}
            />
            <br />
            <label className="text-black font-semibold" htmlFor="sheetName ">
              Insert Excel Sheet Name
            </label>
            <br />
            <input
              className="border-2 border-gray-500 rounded-xl p-1 w-full"
              type="text"
              id="sheetName"
              name="sheetName"
              placeholder="sheet1"
              value={sheetName}
              onChange={(event) => {
                setsheetName(event.target.value);
              }}
            />
            <label htmlFor="territoryID">Territory Number:</label>
            <input
              className={`block border-2 border-gray-400 `}
              type="text"
              id="territoryID"
              name="territoryID"
              value={territoryID}
              onChange={(e) => {
                setTerritoryID(e.target.value);
              }}
              required
            ></input>
            <br />
            <button
              className="mt-5 bg-blue-400 text-black p-3 rounded-3xl"
              type="submit"
              value="Submit"
            >
              Submit
            </button>
          </form>
        )}
      </div>
      <LoadingModal setIsOpen={setLoadingModal} isOpen={loadingModal}></LoadingModal>
    </div>
  );
};

export default Question;
