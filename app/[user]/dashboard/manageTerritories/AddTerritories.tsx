"use client";
import { useState } from "react";
import fetchAddTerritory from "@/app/components/fetch/fetchAddTerritory";

export default function AddTerritories() {
  const [location, setLocation] = useState("");
  return (
    <form>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          className="block border-2 border-black"
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          required
        ></input>
      </div>
      <button
        className="border-2 border-black rounded-3xl px-3"
        type="submit"
        onClick={(event) => {
          event?.preventDefault();
          console.log("broo");
          fetchAddTerritory(location);
          window.location.reload();
        }}
      >
        Submit
      </button>
    </form>
  );
}
