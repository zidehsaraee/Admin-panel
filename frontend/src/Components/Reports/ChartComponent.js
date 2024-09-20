import React from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
      "Oct",
      "Des",
    ],
    datasets: [
      {
        label: "Sales",
        data: [150, 200, 120, 195, 180, 89, 110, 190, 90, 145, 110, 100],
        backgroundColor: "rgba(75, 180, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h6" component="div">
          Sales Data
        </Typography>
        <Bar data={data} options={options} style={{ height: '100%' }}/>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
