import {Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Bar} from "recharts";
import { WeatherTooltip } from "./WeatherTooltip.tsx";


type HourlyChartProps = {
    time: Date[];
    temperature: Float32Array;
    precipitationProb: Float32Array;
};



export function HourlyChart({time, temperature, precipitationProb}: HourlyChartProps) {
    const chartData = time.map((date, index) => {
        return {
            hour: date.getHours(),
            temperature: temperature[index],
            precipitationProb: precipitationProb[index],
        };
    });

    return (
        <>
        <ResponsiveContainer width="100%" height={300} className="[&_svg_*:focus:not(:focus-visible)]:outline-none">
            <ComposedChart data={chartData} accessibilityLayer={false}>
            <XAxis dataKey="hour" tickFormatter={(value) => `${value}:00`}/>
            <YAxis yAxisId="temperature" hide />
            <YAxis yAxisId="precipitation" domain={[0, 100]} hide />
            <Tooltip content={<WeatherTooltip />} cursor={false} />
            <Line
                yAxisId="temperature"
                type="monotone"
                dataKey="temperature"
                stroke="#b68223"
                activeDot={false}
            />
            <Bar
                yAxisId="precipitation"
                dataKey="precipitationProb"
                radius={[5, 5, 0, 0]}
                barSize={30}
                fill="#3e7bad"
            />
            </ComposedChart>
        </ResponsiveContainer>
        </>
    );
}
