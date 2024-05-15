"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import userImg from "../../public/images/user.svg";
import trash from "../../public/images/trash.svg";
import edit from "../../public/images/edit.svg";
import EditCongregationModal from "./EditCongregationModal";
import DeleteCongregationModal from "./CancelModal";
import fetchDeleteCongregation from "../../components/fetch/fetchDeleteCongregation";
import { Congregation } from "@prisma/client";
import { CongregationErrorFormHandler } from "@/app/types/error";
export default function EditCongregation() {
  const [congregations, setCongregations] = useState<Congregation[] | null>(null);
  const [selectedCongregation, setSelectedCongregation] = useState<Congregation | null>(null);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const [setSelectedEntity, setEntity] = useState({});
  const [formErrorHandler, setFormErrorHandler] = useState<CongregationErrorFormHandler>({});
  useEffect(() => {
    async function duv() {
      const res = await fetch(`/api/congregation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCongregations(data);
      if (data.length > 0) {
        setSelectedCongregation(data[0]);
      }
    }
    duv();
  }, []);
  if (!congregations) {
    return <h1>...Checking</h1>;
  }
  return (
    <div className="flex flex-col gap-10 mt-10">
      {Array.isArray(congregations) ? (
        congregations.length > 0 ? (
          congregations.map((congregation, index) => {
            return (
              <div key={index} className="flex">
                <button
                  onClick={() => {
                    setisEditOpen(true);
                    setSelectedCongregation(congregation);
                  }}
                  className="flex flex-grow items-center justify-center"
                >
                  <Image src={userImg} alt="User Symbol" className="inline" height={50} />
                  <h1 className="inline w-full text-start mx-5">{congregation.congregationName}</h1>
                  <div className="inline mr-5">
                    <Image src={edit} alt="Edit Symbol" className="inline" height={25} />
                  </div>
                </button>
                <button
                  className="inline"
                  onClick={() => {
                    setEntity({
                      data: { id: congregation.id },
                      message: `Are you sure you want to delete ${congregation.congregationName}?`,
                      function: fetchDeleteCongregation,
                    });
                    setisDeleteOpen(true);
                  }}
                >
                  <Image src={trash} alt="Trash Symbol" className="m-auto inline" height={25} />
                </button>
              </div>
            );
          })
        ) : (
          <div>No Congregation available</div>
        )
      ) : (
        <div>{"An error occurred"}</div>
      )}
      <EditCongregationModal
        isOpen={isEditOpen}
        setIsOpen={setisEditOpen}
        congregation={selectedCongregation!}
      ></EditCongregationModal>
      <DeleteCongregationModal
        isOpen={isDeleteOpen}
        setIsOpen={setisDeleteOpen}
        entity={setSelectedEntity}
        setFormErrorHandler={setFormErrorHandler}
      ></DeleteCongregationModal>
    </div>
  );
}
