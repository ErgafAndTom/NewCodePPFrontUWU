import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Title } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Title);

const ChartJs = ({ data }) => {
    const chartRef = useRef(null);
    let chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.map(point => new Date(point.time)),
                datasets: [
                    {
                        label: "Time Series Data",
                        data: data.map(point => point.value),
                        borderColor: "#333",
                        backgroundColor: "red",
                        pointRadius: 5,
                        pointHoverRadius: 7,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "minute",
                            displayFormats: {
                                minute: "HH:mm"
                            }
                        },
                        title: {
                            display: true,
                            text: "Time"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Value"
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return `Value: ${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }, [data]);

    return <canvas ref={chartRef} width={600} height={320} className="border" />;
};

export default ChartJs;