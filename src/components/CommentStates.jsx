import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  const CommentStats = ({ stats, totalComments }) => {
    
    const safeStats = stats || { Agree: 0, Disagree: 0, Neutral: 0 };
  
    // Calculate percentages safely
    const getPercentage = (count) => (totalComments > 0 ? ((count / totalComments) * 100).toFixed(1) : 0);
  
    return (
      <div className="p-4 grid  grid-cols-1 md:grid-cols-2 gap-4">
     {/* Card 1: Progress Bars */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {[
              { label: "Agree", value: safeStats.Agree, color: "bg-white " },
              { label: "Disagree", value: safeStats.Disagree, color: "bg-white" },
              { label: "Neutral", value: safeStats.Neutral, color: "bg-white" },
            ].map(({ label, value, color }) => (
              <div key={label} className="mb-1">
                <div className="flex justify-between mb-1">
                  <span className=" text-sm text-slate-300">{label}</span>
                  <span className=" text-sm">{getPercentage(value)}%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-2">
                  <div
                    className={`${color} h-2 rounded-full`}
                    style={{ width: `${getPercentage(value)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
           {/* Card 2: Numerical Representation */}
        <Card>
          <CardHeader>
            <CardTitle>Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
           
            <div className="mb-4">
              <h1 className="text-3xl font-bold">{totalComments}</h1>
            </div>
  
            {/* Sentiment Counts */}
            <div className=" flex justify-center  items-center h-12">
              <div className="flex flex-col w-28 h-12 items-center  justify-center">
                <span className="text-lg font-bold ">{safeStats.Agree}</span>
                <span className="text-xs text-slate-300 font-semibold">Agree</span>
              </div>
              <div className="flex  w-28 h-12 flex-col items-center justify-center">
                <span className="font-bold text-lg">{safeStats.Disagree}</span>
                <span className="text-xs text-slate-300 font-semibold">Disagree</span>
              </div>
              <div className="flex flex-col w-28 h-12  items-center justify-center">
                <span className="font-bold text-lg">{safeStats.Neutral}</span>
                <span className="text-xs text-slate-300 font-semibold">Neutral</span>
              </div>
            </div>
          </CardContent>
        </Card>
  
        
      </div>
    );
  };
  
  export default CommentStats;
  