import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Contracts',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface ContractStatsProps {
  contracts: {
    contractName: string;
    isAccepted: boolean;
    schedule: Date;
    isPaid: boolean;
    rehearsalSchedule: [];
    createdAt: string;
    price: number;
    _id: string;
    artist: {
      name: string;
      instrument: string;
    };
  }[];
}

export function ContractStats({ contracts }: ContractStatsProps) {
  const amountBymonth = [];
  for (let i = 0; i < labels.length; i++) {
    let counter = 0;
    contracts.forEach((contract) => {
      if (new Date(contract.createdAt).getMonth() === i) {
        counter += 1;
      }
    });
    amountBymonth.push(counter);
  }

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Amount',
        data: amountBymonth,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
