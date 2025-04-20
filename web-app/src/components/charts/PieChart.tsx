import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const data = {
    labels: ['Passed', 'Failed', 'Blocked', 'Skipped'],
    datasets: [
      {
        label: 'Cases',
        data: [12, 19, 3, 4],
        backgroundColor: ['#10B981', '#F43F5E', '#FBBF24', '#94A3B8'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 20,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-md w-full h-full flex flex-col items-start">
        <h1 className="text-4xl font-bold m-8">TEST</h1>
        <div className="h-full w-full">
          <Pie data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default PieChart;
