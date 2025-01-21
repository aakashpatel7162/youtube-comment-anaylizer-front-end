import axios from 'axios';
// 
// const API_BASE_URL = 'http://localhost:3000/api/comments';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchData(videoUrl) {
  try {
    // Step 1: Fetch Comments from Backend
    console.log(API_BASE_URL)
    const { data: commentsData } = await axios.post(`${API_BASE_URL}/fetch-comments`, {
      videoUrl,
    });

    const { videoId, comments } = commentsData;
    const totalComments = comments.length;
    console.log(totalComments);

    // Step 2: Analyze Comments
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

    // Step 3: Group Comments by Month
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const commentsByMonth = {};

    analyzedComments.forEach(({ createdAt }) => {
      const date = new Date(createdAt);
      const month = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      commentsByMonth[month] = (commentsByMonth[month] || 0) + 1;
    });

    // Step 4: Format Data for the Chart
    const months = Object.keys(commentsByMonth).sort(
      (a, b) => new Date(a) - new Date(b) // Ensure months appear in order
    );

    const chartData = {
      labels: months, // X-axis → Months
      datasets: [
        {
          label: "Total Comments Per Month",
          data: months.map((month) => commentsByMonth[month]),
          backgroundColor: "#a55ad7", // Blue color for bars
        },
      ],
    };

    return { stats: sentimentCounts, chartData, totalComments };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}



// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api/comments';

// export async function fetchData(videoUrl) {
//   try {
//     // Step 1: Fetch Comments from Backend
//     const { data: commentsData } = await axios.post(`${API_BASE_URL}/fetch-comments`, {
//       videoUrl,
//     });

//     const { videoId, comments } = commentsData;

//     // Step 2: Analyze Comments
//     const { data: analysisData } = await axios.post(`${API_BASE_URL}/analyze-comments`, {
//       videoId,
//       comments,
//     });

//     // Step 3: Format Data for the Chart
//     const sentimentCounts = analysisData.analyzedComments.reduce(
//       (acc, comment) => {
//         acc[comment.sentiment] = (acc[comment.sentiment] || 0) + 1;
//         return acc;
//       },
//       { Agree: 0, Disagree: 0, Neutral: 0 }
//     );

//     const chartData = {
//       labels: ['Agree', 'Disagree', 'Neutral'],
//       datasets: [
//         {
//           label: 'Sentiment Analysis',
//           data: [sentimentCounts.Agree, sentimentCounts.Disagree, sentimentCounts.Neutral],
//           backgroundColor: ['#4CAF50', '#F44336', '#FFC107'], // Green, Red, Yellow
//         },
//       ],
//     };

//     return { stats: sentimentCounts, chartData };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// }
