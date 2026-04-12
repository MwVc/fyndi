import JobCard from "./JobCard";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Main = () => {
  return (
    <>
      <main className="mx-auto w-full md:w-7/12">
        {/* list of jobs */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {numbers.map((number) => (
            <JobCard key={number} id={number} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;
