import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WeatherTooltip } from './WeatherTooltip.tsx';

type HourlyChartProps = {
  time: Date[];
  temperature: Float32Array;
  precipitationProb: Float32Array;
};

export function HourlyChart({time, temperature, precipitationProb}: HourlyChartProps){

    const chartData = time.map((date, index) => {
        return{
            hour: date.getHours(),
            temperature: temperature[index],
            precipitationProb: precipitationProb[index]
        }
    });

    return(
        <>
            <h3>Wykres temperatury</h3>
        
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis dataKey="hour" tickFormatter={(value) => `${value}:00`} />
                    <YAxis tickFormatter={(value) => `${value}°C`}/>
                    <Tooltip content={<WeatherTooltip />} />
                    <Line type="monotone" dataKey="temperature" />
                </LineChart>
            </ResponsiveContainer>



        </>
    )
}