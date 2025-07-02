import React from 'react';
// Pie chart component
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './product.css'

// Register the chart modules for pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

// Functional component that takes user and product count
const DashboardChart = ({ usersCount, productCount }) => {
  // Define the chart data
  const data = {
    labels: ['Users Registered', 'Number of Products'],
    datasets: [
      {
        data: [usersCount, productCount],
        backgroundColor: ['#9a5fd1', '#5f9ad1'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true, // Adjusts to screen size
    plugins: {
      legend: {
        labels: { color: 'white' },
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{  margin: '10px auto', padding: '10px', borderRadius: '20px' }}>
        <h4 style={{ color: '#fff', textAlign: 'center', marginBottom: '20px', letterSpacing: '1px', fontFamily:'courier' }}>SYSYEM OVERVIEW</h4>
        <Pie data={data} options={options} />
    </div>

  );
};

export default DashboardChart;
