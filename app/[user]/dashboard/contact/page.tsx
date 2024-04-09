"use client";
import HomepageLayout from "../../../components/Layout/DashboardLayout";

import { useState } from "react";

const ContactUs = () => {
  const [submitt, onSubmitt] = useState(false);

  const [formResult, isFormResult] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const nameVal = (document.getElementById("name") as HTMLInputElement)
      ?.value;
    const emailVal = (document.getElementById("email") as HTMLInputElement)
      ?.value;
    const msg = (document.getElementById("message") as HTMLInputElement)?.value;
    console.log(nameVal, emailVal, msg);
    if (!nameVal || !emailVal || !msg) {
      isFormResult(true);
      console.log("hello?");
    } else {
      isFormResult(false);
      event.preventDefault();
      const formData = new FormData(event.target);

      formData.append("access_key", process.env.NEXT_PUBLIC_EMAIL_KEY);

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      const result = await response.json();
      onSubmitt(true);
      if (result.success) {
        console.log(result);
      }
    }
  }
  return (
    <HomepageLayout>
      <section
        id="contact"
        className="bg-orangeJ flex justify-center snap-start"
      >
        <div className="flex flex-col p-20 gap-10 justify-center">
          <div className="font-bold text-3xl" id="contact-title">
            Contact Me!
          </div>
          <div className="">
            <form
              action=""
              className="flex flex-wrap gap-5"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="name"
                className="flex grow border border-gray-600"
                id="contact-name"
              >
                <textarea
                  id="name"
                  name="name"
                  className="w-full h-12 lg:h-20 p-3"
                  placeholder="Name"
                />
              </label>
              <label
                htmlFor="email"
                className="flex grow border border-gray-600"
                id="contact-email"
              >
                <textarea
                  id="email"
                  name="email"
                  className="w-full h-12 lg:h-20 p-3"
                  placeholder="Email"
                />
              </label>
              <label
                htmlFor="message"
                className="flex basis-full border border-gray-600"
                id="contact-message"
              >
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="w-full p-3"
                />
              </label>
              <div
                className={`basis-full ${submitt ? "hidden" : ""} `}
                id="contact-submit"
              >
                <input
                  type="submit"
                  value="Send Message"
                  className="px-5 py-1 border-white border-4 bg-gray-300 rounded-xl hover:text-white"
                />
              </div>
            </form>
          </div>
          <p
            className={`font-normal text-light-grey1 max-w-[900px] ${
              submitt ? "" : "hidden"
            } `}
          >
            Your message has been successfully received. We appreciate your
            interest in DB Finder. Our team is reviewing your inquiry, and we
            will get back to you as soon as possible.
          </p>

          {formResult ? (
            <p className="font-normal text-red-500">
              Please make sure the form has all fields filled out
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </section>
    </HomepageLayout>
  );
};
export default ContactUs;

// export default function Contact() {
//   return (
//     <HomepageLayout>
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center mt-24 mb-12">
//           Contact Us
//         </h1>
//         <div className="bg-white shadow-lg rounded-lg p-12">
//           <p className="text-lg text-gray-700 mb-6">
//             If you have any questions or need assistance, please feel free to
//             contact us.
//           </p>

//           <form className="space-y-6">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 id="message"
//                 rows="4"
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               ></textarea>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Send Message
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </HomepageLayout>
//   );
// }
