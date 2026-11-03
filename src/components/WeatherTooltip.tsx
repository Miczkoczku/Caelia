type WeatherTooltipProps = {
    active?: boolean;
    payload?: { payload: { temperature: number; precipitationProb: number } }[];
    label?: string | number;
};
    

export function WeatherTooltip({ active, payload, label }: WeatherTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }
    return (
        <div>
            <p>Godzina: {label}:00</p>
            <p>Temperatura: {Math.round(payload[0].payload.temperature)}°C</p>
            <p>Opady: {payload[0].payload.precipitationProb}%</p>
        </div>
    );
}