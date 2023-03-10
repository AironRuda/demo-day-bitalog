import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Material } from '../../model/material.model';
import { getMajorSpents } from '../../utilities/formatInventory';

interface IPieProps {
  spents: Material[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FunctionComponent<IPieProps> = ({ spents }) => {
  const data = {
    labels: getMajorSpents(spents).map((spent) => spent.material),
    datasets: [
      {
        label: 'Gasto',
        data: getMajorSpents(spents).map((spent) => spent.amount),
        backgroundColor: [
          '#31C48D',
          '#007046',
          '#3A80BF',
          '#83EA3A',
          '#73EABD',
        ],
        borderWidth: 2,
        borderColor: '#334155',
      },
    ],
  };

  return (
    <div className='lg:w-1/3 w-screen h-1/2 lg:h-[60vh] md:mt-0 mt-10 flex flex-col justify-center items-center'>
      <h2 className='text-center text-3xl mb-5 text-slate-500 font-semibold'>Mayores gastos</h2>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              titleFont: {
                size: 18,
              },
              bodyFont: {
                size: 16,
              },
            },
          },
          responsive: true,
        }}
      />
    </div>
  );
};

export default PieChart;
