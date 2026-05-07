import { useState } from "react";

const ImageCarousel = ({
  images,
}: {
  images: { url: string; id: number }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            className="w-full shrink-0 aspect-video object-cover"
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2"
      >
        ❯
      </button>
    </div>
  );
};

export default ImageCarousel;
