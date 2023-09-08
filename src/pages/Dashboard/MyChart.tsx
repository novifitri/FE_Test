import { useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartProp = {
  unitKerja: any,
  ruas: any,
}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Jumlah Ruas berdasarkan Unit Kerja',
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Jumlah Ruas',
      },
      min: 0,
      max: 10,
      ticks: {
        stepSize : 5
      }
    },
  },
};
export default function MyChart(props: ChartProp) {
  // put this inside the react component
  const label: any = []
  const dataRuas: any = []
  const findRuasWithUnitId = (unitId: string) => {
    const found = props?.ruas?.filter((item: any) => item?.unit_id === unitId)
    return found?.length
  }
  props.unitKerja.forEach((item: any) => {
    label.push(item?.unit)
    dataRuas.push(findRuasWithUnitId(item.id))
  })
  const [data, setData] = useState({
    labels: label,
    datasets: [{
      label: 'Jumlah Ruas Berdasarkan Unit Kerja',
      data: dataRuas,
      backgroundColor: [
        'rgb(37 99 235)'
      ],
      borderColor: [
        'rgb(153, 102, 255)'
      ],
      borderWidth: 1
    }]
  });
  return (
    <Bar data={data} options={options} />
  )
}
