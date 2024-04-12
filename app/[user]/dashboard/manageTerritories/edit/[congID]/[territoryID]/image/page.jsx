"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../../../../../../components/Layout/HomepageLayout";
import Upload from "../upload";
const Gallery = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/images`);
      const data = await res.json();
      setImage(data);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Upload></Upload>
      <div className="page">
        <h1>Image Gallery</h1>
        <main>
          {images.map((image) => (
            <img
              src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
              key={image.publicId}
            />
          ))}
        </main>
      </div>
      <style jsx>{`
        .image {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .image:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .image + .image {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Gallery;
