import { SelectAddObservationProps } from "@/app/types/common";
import { Observation } from "@prisma/client";
import React, { ChangeEvent, useEffect, useState } from "react";
function SelectObservation(props: SelectAddObservationProps) {
  const [selectedOption, setSelectedOption] = useState(props.uniqueOption);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as
      | "EMPTY"
      | "NO_LLEGAR"
      | "INGLES"
      | "OTRO_IDIOMA"
      | "DUERME_DE_DIA"
      | "VARON_VISITA"
      | "PERRO_AFUERA"
      | "PERRO_EN_CASA"
      | "TESTIGOS"
      | "VIOLENTO"
      | "NO_TRASPASAR"
      | "CANDADO";
    setSelectedOption(newValue);
    props.handleChange(e);
  };
  useEffect(() => {
    if (!props.isEditable) {
      setSelectedOption(props.uniqueOption);
    }
  }, [props.isEditable, props.uniqueOption]);
  return (
    <select
      className=" bg-white  border-2 rounded-xl px-3"
      onChange={handleChange}
      // onBlur={handleBlur}
      value={selectedOption}
      id={props.houseID}
      name="observation"
    >
      <option value={props.uniqueOption}>
        {invertedObservationMapping[props.uniqueOption] || "Add Observation"}
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
