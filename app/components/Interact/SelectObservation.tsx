import { Observation } from "@prisma/client";
import onUserChange from "../fetch/postRequest";
import { SelectObservationProps } from "../../types/common";
import React from "react";
function SelectObservation(props: SelectObservationProps) {
  return (
    <select
      className=" bg-white  border-2 rounded-xl px-3 w-full  whitespace-nowrap overflow-hidden text-ellipsis"
      onChange={(e) => {
        const houseID = e.target.id;
        onUserChange(
          parseInt(houseID, 10),
          props.territoryID,
          props.congregationID,
          e.target.value,
          ""
        );
      }}
      id={props.houseID}
    >
      <option value={props.uniqueOption}>
        {invertedObservationMapping[props.uniqueOption] || ""}
      </option>
      {props.options.map((option, index) => {
        if (option !== props.uniqueOption) {
          return (
            <option key={index} value={option}>
              {invertedObservationMapping[option]}
            </option>
          );
        }
        return null;
      })}
    </select>
  );
}
const invertedObservationMapping: { [key in Observation]: string } = {
  [Observation.EMPTY]: "",
  [Observation.NO_LLEGAR]: "No llegar",
  [Observation.INGLES]: "Ingles",
  [Observation.OTRO_IDIOMA]: "Otro Idioma",
  [Observation.DUERME_DE_DIA]: "Duerme de dia",
  [Observation.VARON_VISITA]: "Varon visita",
  [Observation.PERRO_AFUERA]: "Perro afuera",
  [Observation.PERRO_EN_CASA]: "Perro en casa",
  [Observation.TESTIGOS]: "Testigos",
  [Observation.VIOLENTO]: "Violento",
  [Observation.NO_TRASPASAR]: "No traspasar",
  [Observation.CANDADO]: "Candado",
  // Add other mappings as necessary
};

export default SelectObservation;
