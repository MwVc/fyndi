import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/cards/JobCard";

const categories = ["Electronics", "Clothes", "Cars", "Jobs", "Services"];

const Home = () => {
  return (
    <main className="p-4 space-y-6">
      {/* search */}
      <div className="w-full flex items-center">
        <Input placeholder="Search on Fyndi" className="flex-1" />
        <Button className="ml-2">Search</Button>
      </div>

      {/* categories */}
      <div className="flex space-x-3 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="whitespace-nowrap px-4"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* featured cards */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <JobCard key={item} item={item} />
        ))}
      </section>
    </main>
  );
};

export default Home;
