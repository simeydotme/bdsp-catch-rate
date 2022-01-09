export const config = {
  type: "doughnut",
  data: {
    circumference: 90,
    datasets: [
      {
        circumference: 270,
        rotation: 225,
        data: [],
        backgroundColor: [
          "#fb1d46",
          "#fb1d46d0",
          "#fb1d46b0",
          "#fb1d4690",
          // "#e5465b",
          // "#ce6e70",
          // "#b6ac9f",
          "#7effba",
        ],
      },
    ],
  },
  options: {
    layout: {
      padding: 5,
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "#333844",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "80%",
  },
};
