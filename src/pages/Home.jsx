import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import Loader from "../components/Loader";
import { fetchData } from "../api";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleAnalyze = async (videoUrl) => {
    setLoading(true);
    
    const result = await fetchData(videoUrl);
    
    if (result) {
      localStorage.setItem("showResult", "true"); 
      setLoading(false);
      navigate("/result", { 
        state: { 
          stats: result.stats, 
          chartData: result.chartData, 
          totalComments: result.totalComments 
        } 
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-black text-white min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-md  border border-gray-700 bg-black shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">YouTube Comment Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="">
              <h6 className="text-sm text-center text-gray-400 font-semibold">Enter YouTube video URL to analyze its comments</h6>
            </div>
          <InputForm onSubmit={handleAnalyze} />
          {loading && <Loader />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
