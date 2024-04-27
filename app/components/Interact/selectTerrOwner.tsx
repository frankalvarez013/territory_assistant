import onUserChange from "../fetch/patchTerrOwner";
import { useSession } from "next-auth/react";
function SelectComponent({ uniqueOption, options, territoryId, congregationId }) {
  const { data: session, status } = useSession();
  return (
    <select
      className=" bg-white  border-2 rounded-xl px-3"
      onChange={async (e) => {
        await onUserChange(territoryId, e.target.value, congregationId);
        window.location.reload();
      }}
    >
      {console.log(uniqueOption.name)}
      {console.log(uniqueOption.name.localeCompare("Add a User"))}
      <option value={uniqueOption.id}>
        <div className=" text-gray-300">{uniqueOption.name}</div>
      </option>
      {uniqueOption.name.localeCompare("Add a User") !== 0 ? (
        <option value={session?.user.id}>
          <div className=" text-gray-300">Make Empty</div>
        </option>
      ) : null}

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
