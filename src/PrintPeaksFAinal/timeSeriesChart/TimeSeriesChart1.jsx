import React, { useEffect, useRef, useState } from "react";

const TimeSeriesChart = ({ data }) => {
    const canvasRef = useRef(null);
    const [hoverX, setHoverX] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

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

        // Цвета точек в зависимости от статуса
        const statusColors = {
            "0": "#ffffff",
            "1": "#8b4513",
            "2": "#3c60a6",
            "3": "#f075aa",
            "4": "#008249"
        };

        // Draw grid
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;

        for (let i = 0; i <= 5; i++) {
            const x = padding + (i / 5) * graphWidth;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }

        for (let i = 0; i <= 5; i++) {
            const y = height - padding - (i / 5) * graphHeight;
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
        data.forEach((point, i) => {
            const x = normalizeX(times[i]);
            const y = normalizeY(point.value);
            ctx.fillStyle = statusColors[point.status] || "#ff0000";
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });

    }, [data, hoverX]);

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

    return <canvas style={{ margin: "0" }} ref={canvasRef} width={700} height={330} onMouseMove={handleMouseMove} />;
};

export default TimeSeriesChart;