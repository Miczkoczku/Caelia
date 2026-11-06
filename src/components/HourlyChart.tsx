import {Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Bar, Area, ReferenceLine} from "recharts";
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
        <ResponsiveContainer width="100%" height="100%" minHeight={320} className="[&_svg_*:focus:not(:focus-visible)]:outline-none">
            <ComposedChart data={chartData} accessibilityLayer={false} >
            <XAxis dataKey="hour" tickFormatter={(value) => `${value}:00`}/>
            <YAxis yAxisId="temperature" hide />
            <YAxis yAxisId="precipitation" domain={[0, 100]} hide />
            <Tooltip content={<WeatherTooltip />} cursor={{ stroke: "#ffffff30", strokeDasharray: "4 4" }} />
                        
            <defs>
            <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
            </linearGradient>
            </defs>

            
            <Area
            yAxisId="temperature"
            type="monotone"
            dataKey="temperature"
            baseValue="dataMin"
            stroke="none"
            fill="url(#temperatureGradient)"
            tooltipType="none"
            isAnimationActive={true}
            animationDuration={500}
            animationEasing="ease-in-out"
            />


            <Line
            yAxisId="temperature"
            type="monotone"
            dataKey="temperature"
            stroke="#fbbf24"
            strokeWidth={2.5}
            dot={{
                r: 2.5,
                fill: "#fbbf24",
                stroke: "#fbbf24",
                strokeWidth: 0,
            }}
            activeDot={{
                r: 5,
                fill: "#fbbf24",
                stroke: "#ffffff",
                strokeWidth: 1.5,
            }}
            isAnimationActive={true}
            animationDuration={500}
            animationEasing="ease-in-out"
            />

            <Bar
                yAxisId="precipitation"
                dataKey="precipitationProb"
                radius={[5, 5, 0, 0]}
                barSize={30}
                fill="#3e7bad"
            />

            
            <ReferenceLine
            yAxisId="temperature"
            y={0}
            stroke="#94a3b8"
            strokeOpacity={0.45}
            strokeDasharray="4 4"
            label={{
                value: "0°C",
                position: "insideTopLeft",
                fill: "#94a3b8",
                fontSize: 11,
            }}
            />

            </ComposedChart>
        </ResponsiveContainer>
        </>
    );
}
