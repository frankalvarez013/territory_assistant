function SelectComponent({ uniqueOption, options }) {
  return (
    <select className=" bg-white  border-2 rounded-xl px-3">
      <option value={uniqueOption.id}>{uniqueOption.name}</option>
      {options.map((option, index) => {
        if (option.id !== uniqueOption.id) {
          return (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          );
        }
        return null;
      })}
    </select>
  );
}
export default SelectComponent;
