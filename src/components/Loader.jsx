import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <Skeleton className="w-16 h-16 rounded-full" />
    </div>
  );
};

export default Loader;
