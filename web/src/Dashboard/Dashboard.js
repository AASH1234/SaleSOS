import React from 'react';
import './Dashboard.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement);

function Dashboard() {
  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <main className="grid-container">
      <div className="grid-item item1">Your Balance Summary</div>
      <div className="grid-item item2">
        <div>Expense</div>
        <div className="expense-amount">₹25,000</div>
      </div>
      <div className="grid-item item3">Others</div>
      <div className="grid-item item4">
        <div>Income</div>
        <div className="income-amount">₹50,000</div>
      </div>
      <div className="grid-item item5">
        <Bar data={barChartData} />
      </div>
      <div className="grid-item item6">
        <Pie data={pieChartData} />
      </div>
      <div className="grid-item item7">
        <Line data={lineChartData} />
      </div>
      <div className="grid-item item8">Admission Summary</div>
      <div className="grid-item item9">Contacts</div>
    </main>
  );
}

export default Dashboard;
