"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import userImg from "../../public/images/user.svg";
import trash from "../../public/images/trash.svg";
import edit from "../../public/images/edit.svg";
import EditCongregationModal from "./EditCongregationModal";
import DeleteCongregationModal from "./DeleteCongregationModal";
export default function EditUsers() {
  const [congregations, setcongregations] = useState(null);
  const [selectedCongregation, setSelectedCongregation] = useState(null);
  const [isEditOpen, setisEditOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  useEffect(() => {
    async function duv() {
      const res = await fetch(`/api/congregation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setcongregations(data);
      if (data.length > 0) {
        setSelectedCongregation(data[0]);
      }
    }
    duv();
  }, []);
  if (!congregations) {
    return <h1>...Checking</h1>;
  }

  console.log("checkin", congregations);
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
                  <Image
                    src={userImg}
                    alt="User Symbol"
                    className="inline"
                    height={50}
                  />
                  <h1 className="inline w-full text-start mx-5">
                    {congregation.congregationName}
                  </h1>
                  <div className="inline mr-5">
                    <Image
                      src={edit}
                      alt="Edit Symbol"
                      className="inline"
                      height={25}
                    />
                  </div>
                </button>
                <button
                  className="inline"
                  onClick={() => {
                    setSelectedCongregation(congregation);
                    setisDeleteOpen(true);
                  }}
                >
                  <Image
                    src={trash}
                    alt="Trash Symbol"
                    className="m-auto inline"
                    height={25}
                  />
                </button>
              </div>
            );
          })
        ) : (
          <div>No Congregation available</div>
        )
      ) : (
        <div>{congregations.message || "An error occurred"}</div>
      )}
      <EditCongregationModal
        isOpen={isEditOpen}
        setIsOpen={setisEditOpen}
        congregation={selectedCongregation}
      ></EditCongregationModal>
      <DeleteCongregationModal
        isOpen={isDeleteOpen}
        setIsOpen={setisDeleteOpen}
        congregation={selectedCongregation}
      ></DeleteCongregationModal>
    </div>
  );
}
