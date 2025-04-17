import { useState, useEffect, useMemo } from "react";
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
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "@/apis/coinGecko";
import Loader from "@/components/Loader/Loader";
import { useResize } from "@/hooks/useResize";
import { chartDays } from "@/static/chartDays";
import SelectButton from "./Components/SelectButton/SelectButton";
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

const HistoryChart: React.FunctionComponent<{ coin: string }> = ({ coin }) => {
  const [coinData, setCoinData] = useState<number[][] | null>(null);
  const [days, setDays] = useState<number>(1);
  const { screenSize } = useResize();

  useEffect(() => {
    const fetchHistoricData = async () => {
      try {
        const response = await HistoricalChart(coin, days);
        setCoinData(response.prices);
      } catch (error) {
        console.error("Failed to fetch historical data", error);
      }
    };
    fetchHistoricData();
  }, [coin, days]);

  const coinChartData = useMemo(
    () =>
      coinData?.map((value) => ({
        x: value[0],
        y: value[1].toFixed(2),
      })),
    [coinData]
  );


  const data = useMemo(() => {
    return {
      labels: coinData?.map((coin) => {
        let date = new Date(coin[0]);
        let time = `${date.getHours()}:${date.getMinutes()}`;
        return days === 1 ? time : date.toLocaleDateString();
      }),
      datasets: [
        {
          fill: true,
          label: coin,
          data: coinChartData?.map((val) => val.y),
          borderColor: "gold",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }, [coinData, days, coinChartData]);


  if (!coinData) {
    return <Loader />;
  }


  const showTicks = screenSize < 400 ? { display: false } : { color: "#fff" };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { ticks: showTicks },
      y: { ticks: { color: "#fff" } },
    },
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
