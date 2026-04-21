const ImageCarousel = ({
  images,
}: {
  images: { url: string; id: number }[];
}) => {
  const total = images.length;
  return (
    <div className="carousel w-auto rounded-2xl">
      {images.map((image, index) => {
        const prevIndex = (index - 1 + total) % total;
        const nextIndex = (index + 1) % total;

        return (
          <div id={`slide${index}`} className="carousel-item relative w-full">
            <img src={image.url} className="w-full aspect-video" />
            <div className="heading"></div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${prevIndex}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide${nextIndex}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageCarousel;
