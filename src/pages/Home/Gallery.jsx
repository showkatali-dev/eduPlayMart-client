/* eslint-disable react/prop-types */
import { useLoaderData } from "react-router-dom";
import loadingSvg from "../../assets/spinner.svg";
import { useLazyImage } from "../../hooks/useLazyImage";

const GalleryImage = ({ item }) => {
  const { imageRef, shouldLoadImage } = useLazyImage();

  return (
    <img
      ref={imageRef}
      src={shouldLoadImage ? item.img : loadingSvg}
      className="w-full aspect-square object-cover object-center border-2 border-white custom-shadow"
    />
  );
};

const Gallery = () => {
  const { gallery } = useLoaderData();

  return (
    <div className="container my-20">
      <h1 className="text-center text-5xl font-extrabold mb-12 font-nunito">
        Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
        {gallery.map((item) => (
          <GalleryImage key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
