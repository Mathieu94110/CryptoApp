import { useState, useEffect } from "react";
import SelectButton from "../SelectButton/SelectButton";
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
} from "chart.js";
import { HistoricalChart } from "../../../../apis/coinGecko";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../../../static/chartDays";
import "./HistoryChart.scss";
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

const HistoryChart = ({ coin }: { coin: string }) => {
  const [bitcoinData, setbitcoinData] = useState<number[][]>([]);
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  async function fetchHistoricData() {
    const response = await HistoricalChart(coin, days);
    setflag(true);
    setbitcoinData(response.prices);
  }

  if (!bitcoinData || flag === false) {
    return <div>Chargement en cours</div>;
  } else {
  }
  const coinChartData = bitcoinData.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };
  const data = {
    labels: bitcoinData.map((coin) => {
      let date = new Date(coin[0]);
      let time = `${date.getHours()}:${date.getMinutes()}`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        fill: true,
        label: "bitcoin",
        data: coinChartData.map((val) => val.y),
        borderColor: "gold",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
      <div className="select-button-container">
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {
              setDays(day.value);
              setflag(false);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
    </div>
  );
};

export default HistoryChart;
