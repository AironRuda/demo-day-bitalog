import { Pie } from 'react-chartjs-2';
import { Material } from '../../model/material.model';
import { getMajorSpents } from '../../utilities/formatInventory';

interface IPieProps {
  spents: Material[];
}

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
    <div className='lg:w-1/2 w-screen h-1/2 lg:h-[60vh] mb-10'>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Materiales más utilizados en el proyecto',
              font: {
                size: 18,
              },
            },
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
