import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { QRCodeModalProps } from "@/app/types/common";

export default function QrCodeModal(props: QRCodeModalProps) {
  const [qrCode, setQrCode] = useState("");
  useEffect(() => {
    async function GETQR() {
      const resQRCode = await fetch(
        `https://quickchart.io/qr?text=http://localhost:3000/props.territory/${props.congregation}/${props.territory}`
      );
      const imageBlob = await resQRCode.blob(); // Process response as a Blob
      const imageUrl = URL.createObjectURL(imageBlob); // Create a local URL to the blob object
      setQrCode(imageUrl);
    }
    GETQR();
    console.log("FU");
  }, [props.congregation, props.territory]);
  function closeEditModal() {
    props.setIsOpen(false);
  }
  if (!qrCode) {
    return <h1>Loading</h1>;
  }
  console.log("OI", qrCode);
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeEditModal} onClick={closeEditModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div>
                <img src={qrCode} alt="Picture of QR Code Icon" width="500" height="500" />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
