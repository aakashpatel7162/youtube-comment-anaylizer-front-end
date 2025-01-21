import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api/comments';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchData(videoUrl) {
  try {
    //  Fetch Comments from Backend
    console.log(API_BASE_URL)
    const { data: commentsData } = await axios.post(`${API_BASE_URL}/fetch-comments`, {
      videoUrl,
    });

    const { videoId, comments } = commentsData;
    const totalComments = comments.length;
    console.log(totalComments);

    //  Analyze Comments
    const { data: analysisData } = await axios.post(`${API_BASE_URL}/analyze-comments`, {
      videoId,
      comments,
    });
    
    const analyzedComments = analysisData.analyzedComments;
    const sentimentCounts = analysisData.analyzedComments.reduce(
              (acc, comment) => {
                acc[comment.sentiment] = (acc[comment.sentiment] || 0) + 1;
                return acc;
              },
              { Agree: 0, Disagree: 0, Neutral: 0 }
            );

    //  Group Comments by Month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const commentsByMonth = {};

    analyzedComments.forEach(({ createdAt }) => {
      const date = new Date(createdAt);
      const month = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      commentsByMonth[month] = (commentsByMonth[month] || 0) + 1;
    });

    //  Format Data for the Chart
    const months = Object.keys(commentsByMonth).sort(
      (a, b) => new Date(a) - new Date(b) 
    );

    const chartData = {
      labels: months, 
      datasets: [
        {
          label: "Total Comments Per Month",
          data: months.map((month) => commentsByMonth[month]),
          backgroundColor: "#a55ad7",
        },
      ],
    };

    return { stats: sentimentCounts, chartData, totalComments };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

