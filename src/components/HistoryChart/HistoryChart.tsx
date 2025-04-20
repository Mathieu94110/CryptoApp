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
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "@/apis/coinGecko";
import Loader from "@/components/Loader/Loader";
import { chartDays } from "@/static/chartDays";
import SelectButton from "./Components/SelectButton/SelectButton";
import "./HistoryChart.scss";

const verticalLinePlugin = {
  id: "verticalLine",
  afterDraw: (chart: any) => {
    if (chart.tooltip?._active?.length) {
      const ctx = chart.ctx;
      const x = chart.tooltip._active[0].element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.stroke();
      ctx.restore();
    }
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  verticalLinePlugin
);

const HistoryChart: React.FunctionComponent<{ coin: string }> = ({ coin }) => {
  const [coinData, setCoinData] = useState<number[][] | null>(null);
  const [days, setDays] = useState<number>(1);

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
      labels: coinData?.map((coin) => coin[0]),
      datasets: [
        {
          label: coin,
          data: coinChartData?.map((val) => val.y),
          borderColor: "gold",
          pointRadius: 2,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "gold",
          pointBorderWidth: 1,
        },
      ],
    };
  }, [coinData, days, coinChartData]);

  if (!coinData) {
    return <Loader />;
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            return `Prix : ${context.formattedValue} €`;
          },
          title: function (context) {
            const timestamp = context[0].label;
            const date = new Date(Number(timestamp));
            return date.toLocaleString("fr-FR", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
          callback: function (_val, index) {
            const labels = this.chart.data.labels as number[];
            const timestamp = labels?.[index];
            if (!timestamp) return "";
            const date = new Date(timestamp);
            return days === 1
              ? date.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })
              : date.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
              });
          },
        },
        grid: {
          drawOnChartArea: true,
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          drawOnChartArea: true,
          color: "rgba(255, 255, 255, 0.05)",
        },
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };



  return (
    <div className="history-chart-container">
      <Line options={options} data={data} />
      <div className="select-button-container">
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => setDays(day.value)}
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
