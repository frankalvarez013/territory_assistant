import onUserChange from "../fetch/patchTerrOwner";
function SelectComponent({
  uniqueOption,
  options,
  territoryId,
  congregationId,
}) {
  return (
    <select
      className=" bg-white  border-2 rounded-xl px-3"
      onChange={async (e) => {
        await onUserChange(territoryId, e.target.value, congregationId);
        window.location.reload();
      }}
    >
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
