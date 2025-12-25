import { Card } from "../ui/card";
import { Button } from "../ui/button";

type jobcardProps = {
  item: number;
};

const JobCard = ({ item }: jobcardProps) => {
  return (
    <Card key={item} className="shadow-md">
      <div className="h-40 bg-gray-100 rounded-md">What is here</div>
      <div className="p-3">
        <h3 className="font-semibold text-lg">Item {item}</h3>
        <p className="text-sm text-gray-600">Great product!</p>
        <Button className="mt-2 w-full">View</Button>
      </div>
    </Card>
  );
};

export default JobCard;
