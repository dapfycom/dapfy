"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const ImageSlider = ({ images }: { images: StaticImageData[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia la imagen cada 5 segundos

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="flex justify-center mb-4">
      <Image
        alt={`Imagen ${currentImageIndex + 1}`}
        className="aspect-square object-cover rounded-lg"
        height={500}
        src={images[currentImageIndex]}
        width={500}
      />
    </div>
  );
};

export default ImageSlider;
