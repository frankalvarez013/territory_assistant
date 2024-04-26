import React, { useState } from "react";
import Layout from "../../../../../../components/Layout/HomepageLayout";
import Router from "next/router";

const Upload = (props) => {
  const [imageUploaded, setImageUploaded] = useState(null);

  const handleChange = (event) => {
    setImageUploaded(event.target.files[0]);
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (!imageUploaded) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("image", imageUploaded);
      formData.append("congregationID", props.congregationID);
      formData.append("territoryID", props.territoryID);

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <div>
      <div className=" bg-white p-12 flex justify-center items-center">
        <form onSubmit={submitData}>
          <h1>Upload Image</h1>

          <input onChange={handleChange} accept=".jpg, .png, .gif, .jpeg" type="file"></input>

          <input
            type="submit"
            className={`px-5 py-4 border-0 ${
              imageUploaded
                ? " bg-blue-400 hover:text-white hover:cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            value="Upload"
          />
        </form>
      </div>
    </div>
  );
};

export default Upload;
