import { useLocation, useNavigate } from "react-router-dom";
import CommentStats from "../components/CommentStates";
import CommentChart from "../components/CommentChart";
import { useEffect } from "react";
import {Button } from '@/components/ui/button';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const { stats, chartData, totalComments } = location.state || {};

  const handleSubmit = () => {
    navigate("/"); 
  };

  useEffect(() => {
    if (!stats || !chartData) {
      navigate("/"); 
    }
  }, [stats, chartData, navigate]);

  return (
    <div className="w-[89%] mx-auto bg-black text-white">
      <h2 className="text-2xl font-bold">Analysis Results</h2>
      <CommentStats stats={stats} totalComments={totalComments} />
      <CommentChart chartData={chartData} />
      <div className="px-4 pb-10">

      <Button className="duration-300 hover:bg-white hover:text-black border-gray-500 text-white bg-black border" onClick={handleSubmit}>Analyze New video</Button>
      </div>
    </div>
  );
};

export default Result;

