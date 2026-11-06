import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

type WeatherIconProps = {
  code: number;
  size?: number;
};

export function WeatherIcon({ code, size = 22 }: WeatherIconProps) {
  const props = { size, strokeWidth: 1.8 };

  if (code === 0) {
    return <Sun {...props} className="text-yellow-400" />;
  }

  if (code === 1 || code === 2) {
    return <CloudSun {...props} className="text-yellow-300" />;
  }

  if (code === 3) {
    return <Cloud {...props} className="text-slate-300" />;
  }

  if (code === 45 || code === 48) {
    return <CloudFog {...props} className="text-slate-300" />;
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return <CloudDrizzle {...props} className="text-sky-300" />;
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return <CloudRain {...props} className="text-blue-400" />;
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return <CloudSnow {...props} className="text-blue-200" />;
  }

  if ([95, 96, 99].includes(code)) {
    return <CloudLightning {...props} className="text-purple-300" />;
  }

  return <Cloud {...props} className="text-white/60" />;
}
