import { Input } from "@/components/ui/input"

import {Button } from '@/components/ui/button';
import { useState } from 'react';

const  InputForm = ({ onSubmit }) => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = () => {
    if (videoUrl) {
      onSubmit(videoUrl);
    }
  };

  return (
    <div className="p-4 flex flex-col  justify-center ">
      <Input
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube Video URL"
        className="mb-4 border-gray-400 bg-black outline-none"
      />
      <Button className="bg-white text-black" onClick={handleSubmit}>Analyze Comments</Button>
    </div>
  );
};

export default InputForm;
