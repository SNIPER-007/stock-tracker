import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function MiniChart({ history }) {
  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        data: history,
        borderColor: "#22c55e",
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { ticks: { color: "white" } },
    },
  };

  return <Line data={data} options={options} height={100} />;
}
