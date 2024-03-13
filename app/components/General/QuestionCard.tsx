"use client";
import createExcelTerritory from "../../dashboard/admin/createExcelTerritory";
import { useState } from "react";
const Question = ({ Question }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [sheetID, setsheetID] = useState("");
  const [sheetName, setsheetName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sheetID, sheetName);
    createExcelTerritory(sheetID, sheetName);
  };
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
    // console.log(isHidden);
  };
  return (
    <div className="flex flex-col gap-2  w-96">
      <div
        className="flex justify-between hover:cursor-pointer hover:text-orangeJ"
        onClick={toggleVisibility}
      >
        <h3 className="font-light text-lg">{Question}</h3>
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
          <form action="" className=" pl-8 " onSubmit={handleSubmit}>
            <h1 className="text-black mb-4">
              Make sure you share the Service Account Email in the excel file or
              else it won't work.
            </h1>
            <label htmlFor="sheetID" className="text-black font-semibold">
              Insert Excel Sheet ID
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
    </div>
  );
};

export default Question;
