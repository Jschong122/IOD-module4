document.addEventListener("DOMContentLoaded", function () {
  const chartContainer = document.getElementById("main");

  function fetchAndRenderChart() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const categoryCount = data.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        const categories = Object.keys(categoryCount);
        const counts = Object.values(categoryCount);

        renderChart(categories, counts);
      });
  }

  function renderChart(categories, counts) {
    const myChart = echarts.init(chartContainer);

    const option = {
      title: {
        text: "Fake Store Categories",
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: categories,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "# of products",
          type: "bar",
          data: counts,
        },
      ],
    };

    myChart.setOption(option);
  }

  fetchAndRenderChart();
});
