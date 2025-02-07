import React, { useEffect, useRef, useState } from "react";

const TimeSeriesChart = ({ data }) => {
    const canvasRef = useRef(null);
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [hoverX, setHoverX] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: "", time: "" });

    const statusColors = {
        "0": "#ffffff",
        "1": "#8b4513",
        "2": "#3c60a6",
        "3": "#f075aa",
        "4": "#008249"
    };
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const resolution = 5;
        const resolutionY = 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;
        const graphWidth = width - 2 * padding;
        const graphHeight = height - 2 * padding;

        const times = data.map((point) => new Date(point.time).getTime());
        const values = data.map((point) => point.value);

        const minTime = Math.min(...times);
        const maxTime = Math.max(...times);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);

        const normalizeX = (time) => ((time - minTime) / (maxTime - minTime)) * graphWidth + padding;
        const normalizeY = (value) => height - padding - ((value - minValue) / (maxValue - minValue)) * graphHeight;

        // Draw grid
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;

        for (let i = 0; i <= resolution; i++) {
            const x = padding + (i / resolution) * graphWidth;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }

        for (let i = 0; i <= resolution; i++) {
            const y = height - padding - (i / resolution) * graphHeight;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Draw line chart
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 0.1;
        ctx.beginPath();
        ctx.moveTo(normalizeX(times[0]), normalizeY(values[0]));
        for (let i = 1; i < data.length; i++) {
            ctx.lineTo(normalizeX(times[i]), normalizeY(values[i]));
        }
        ctx.stroke();

        // Draw points
        ctx.fillStyle = "#ff0000";
        data.forEach((point, i) => {
            ctx.beginPath();
            ctx.arc(normalizeX(times[i]), normalizeY(point.value), 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw x-axis labels
        ctx.fillStyle = "#000";
        ctx.font = "1vh Arial";
        for (let i = 0; i <= resolution; i++) {
            const time = minTime + (i / resolution) * (maxTime - minTime);
            const date = new Date(time);
            const label = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            ctx.fillText(label, padding + (i / resolution) * graphWidth - 10, height - 5);
        }

        // Draw y-axis labels
        for (let i = 0; i <= resolution; i++) {
            const value = minValue + (i / resolution) * (maxValue - minValue);
            ctx.fillText(value.toFixed(2), resolution, height - padding - (i / resolution) * graphHeight + 3);
        }

        // Draw vertical hover line
        if (hoverX !== null) {
            ctx.strokeStyle = "#888";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(hoverX, padding);
            ctx.lineTo(hoverX, height - padding);
            ctx.stroke();

            // Display time at bottom
            const timeAtX = minTime + ((hoverX - padding) / graphWidth) * (maxTime - minTime);
            const date = new Date(timeAtX);
            const label = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            ctx.fillStyle = "#000";
            ctx.fillText(label, hoverX - 40, height - 20);
        }

        ctx.fillStyle = "#ff0000";
        data.forEach((point, i) => {
            const x = normalizeX(times[i]);
            const y = normalizeY(point.value);
            ctx.fillStyle = statusColors[point.status] || "#ff0000";
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();

            // Ensure points remain above the hover line and show value on hover
            if (hoverX !== null && Math.abs(hoverX - x) < 5) {
                ctx.fillStyle = "#000";
                ctx.fillText(point.value.toFixed(2), x - 10, y - 10);
                ctx.fillStyle = "#ff0000";
            }
        });
    }, [data, hoveredPoint, hoverX]);

    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const width = canvas.width;
        const padding = 40;

        if (mouseX >= padding && mouseX <= width - padding) {
            setHoverX(mouseX);
        } else {
            setHoverX(null);
        }
    };

    return <canvas style={{margin: "0"}} ref={canvasRef} width={700} height={330} onMouseMove={handleMouseMove} />;
};

export default TimeSeriesChart;
