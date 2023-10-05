import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
  );
function BarGraph(props) {
    const data = {
        labels: ['Grammar', 'Structure', 'Thinking'],
        datasets: [
          {
            label: 'Bar 1',
            backgroundColor: '#3E54AC',
            data: [props.grammar, 0, 0],
          },
          {
            label: 'Bar 2',
            backgroundColor: '#655DBB',
            data: [0, props.structure, 0],
          },
          {
            label: 'Bar 3',
            backgroundColor: '#BFACE2',
            data: [0, 0, props.thinking],
          },
        ],
      };

      const options = {
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: 'black', // change font color
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: 'black', // change font color
                beginAtZero: true, // start at 0
              },
            },
          ],
        },
      };
  


  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Bar data={data}  options={options}/>
    </div>
  );
}

export default BarGraph;