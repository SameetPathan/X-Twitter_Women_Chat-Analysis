import React from 'react';
import { Chart } from 'react-google-charts';

const PieChart = () => {
  // Replace these values with your actual counts
  const totalTweets = 1000;
  const womenTweets = 300;
  const positiveTweets = 600;
  const negativeTweets = 400;

  const data = [
    ['Category', 'Count'],
    ['Total Tweets', totalTweets],
    ['Women Tweets', womenTweets],
    ['Positive Tweets', positiveTweets],
    ['Negative Tweets', negativeTweets],
  ];

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      <Chart
        width={'100%'}
        height={'490px'}
        chartType="PieChart"
        loader={<div>Loading Chart...</div>}
        data={data}
        options={{
          title: 'Twitter Statistics',
          is3D: true,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default PieChart;
