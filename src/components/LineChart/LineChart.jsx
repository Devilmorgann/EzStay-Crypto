import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Data', 'Prices']]);

  useEffect(() => {
    let dataCopy = [['Data', 'Prices']];

    if (historicalData?.prices) {
      historicalData.prices.forEach((item) => {
        // Format date to mm/yy
        const date = new Date(item[0]);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
        dataCopy.push([formattedDate, item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  // Modern chart design with gradients
  const chartData = {
    labels: data.slice(1).map(item => item[0]), // Dates
    datasets: [
      {
        label: 'Crypto Prices',
        data: data.slice(1).map(item => item[1]), // Prices
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light gradient fill
        borderColor: '#4BC0C0', // Line color
        borderWidth: 2,
        pointBackgroundColor: '#4BC0C0',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.7, // Smooth curve for the line
        cubicInterpolationMode: 'dualtone',
      },
    ],
  };

  // Modern chart options with tooltips and responsive settings
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw} ${tooltipItem.datasetIndex === 0 ? '$' : ''}`;
          },
        },
      },
      legend: {
        position: 'bottom', // Move legend to bottom to prevent overflow
      },
      title: {
        display: true,
        text: ' Prices Over Time',
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date (MM/YY)',
          font: {
            weight: 'bold',
            size: 14,
          },
          padding: {
            top: 10,
          },
        },
        grid: {
          display: true, // Hide grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (INR)',
          font: {
            weight: 'bold',
            size: 14,
          },
          padding: {
            bottom: 10,
          },
        },
        grid: {
          color: '#f1f1f1', // Light grid lines for better UI
        },
        ticks: {
          beginAtZero: false,
          padding: 10,
        },
      },
    },
    layout: {
      padding: {
        top: 20, // Add padding to prevent overflow
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    elements: {
      line: {
        tension: 0.4, // Smooth curve
      },
    },
  };

  return (
    <div className="line-chart-container" style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;