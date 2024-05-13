import { Session } from "next-auth";
import onUserChange from "../fetch/patchTerrOwner";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/app/types/api";
import { SelectComponentProps } from "@/app/types/common";

function SelectComponent(props: SelectComponentProps) {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  return (
    <select
      className=" bg-white  border-2 rounded-xl px-3"
      onChange={async (e) => {
        await onUserChange(props.territoryId, e.target.value, props.congregationId);
        window.location.reload();
      }}
    >
      <option value={props.uniqueOption.id}>
        <div className=" text-gray-300">{props.uniqueOption.name}</div>
      </option>
      {props.uniqueOption.name.localeCompare("Add a User") !== 0 ? (
        <option value={session?.user?.id}>
          <div className=" text-gray-300">Make Empty</div>
        </option>
      ) : null}

      {props.options.map((option, index) => {
        if (option.id !== props.uniqueOption.id) {
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
