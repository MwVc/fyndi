import ImageCarousel from "../components/ImageCarousel";

const Job = () => {
  const images = [
    {
      url: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      id: 1,
    },
    {
      url: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      id: 2,
    },
    {
      url: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      id: 3,
    },
    {
      url: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      id: 4,
    },
  ];

  return (
    <div className="mx-auto w-full md:w-7/12 p-2 flex flex-col">
      {/* images */}
      <ImageCarousel images={images} />
      <div>
        <h1 className="head">Job Heading</h1>
      </div>
    </div>
  );
};

export default Job;
