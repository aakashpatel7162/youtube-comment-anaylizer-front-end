import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

  ChartJS.register(
    CategoryScale, 
    LinearScale,   
    BarElement,  
    Title,
    Tooltip,
    Legend
  );
  
  const CommentChart = ({ chartData }) => {
    const defaultChartData = {
      labels: [], 
      datasets: [
        {
          label: "Total Comments Per Month",  
          data: [],  
          backgroundColor: "#a55ad7",  
        },
      ],
    };
  
    return (
      <div className="p-4 ">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Comments Distribution</CardTitle>
          </CardHeader>
          <CardContent height="h-72">
           
            <div className="w-full flex justify-center items-center h-72 text-white">
                
            {chartData?.labels?.length > 0 ? (
           
              <Bar  data={chartData || defaultChartData} />
            ) : (
             
              <p className="text-gray-300">No data available</p>
            )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default CommentChart;
  