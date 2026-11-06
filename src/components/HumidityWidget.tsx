
import { useId } from "react";
import { Droplets } from "lucide-react";

type HumidityWidgetProps = {
	humidity: number;
};

export function HumidityWidget({ humidity }: HumidityWidgetProps) {
	const id = useId().replace(/:/g, "");
	const clipId = `${id}-clip`;
	const waterId = `${id}-water`;
	const depthId = `${id}-depth`;

	const value = Number.isFinite(humidity)
		? Math.max(0, Math.min(100, humidity))
		: 0;

	const radius = 125;
	const center = 150;
	const bottom = center + radius;
	const waterLevel = bottom - (value / 100) * (radius * 2);

	return (
		<section className="flex flex-col rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
			<div className="flex items-center gap-2">
				<Droplets size={20} className="text-blue-300" />
				<h3 className="text-lg font-semibold">Wilgotność</h3>
			</div>

			<div className="flex flex-1 items-center justify-center py-3">
				<svg
					viewBox="0 18 300 300"
					className="h-[240px] w-[240px]"
					role="img"
					aria-label={`Wilgotność powietrza: ${Math.round(value)} procent`}
				>
					<defs>
						<clipPath id={clipId}>
							<circle cx={center} cy={center} r={radius} />
						</clipPath>

						{/* woda */}
						<linearGradient
							id={waterId}
							x1="10%"
							y1="0%"
							x2="85%"
							y2="100%"
						>
							<stop offset="0%" stopColor="#36b8c5" />
							<stop offset="35%" stopColor="#087fa5" />
							<stop offset="70%" stopColor="#164e86" />
							<stop offset="100%" stopColor="#081d42" />
						</linearGradient>

						{/* krawedzie */}
						<radialGradient
							id={depthId}
							cx="45%"
							cy="35%"
							r="75%"
						>
							<stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
							<stop offset="65%" stopColor="#082f49" stopOpacity="0.06" />
							<stop offset="100%" stopColor="#020617" stopOpacity="0.5" />
						</radialGradient>
					</defs>

					{/* tlo */}
					<circle
						cx={center}
						cy={center}
						r={radius}
						fill="#0c2339"
						fillOpacity="0.45"
						stroke="#6b9db8"
						strokeOpacity="0.55"
						strokeWidth="2"
					/>

					{/* animacja */}
					<g clipPath={`url(#${clipId})`}>
						<g
							style={{
								transform: `translateY(${waterLevel}px)`,
								transition:
									"transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
							}}
						>
							{/* powierzchnia wody */}
							<path
								d="M-80 0 Q-40 -10 0 0 T80 0 T160 0 T240 0 T320 0 T400 0 L400 350 L-80 350 Z"
								fill="#4bc5d2"
								opacity="0.65"
							>
								<animateTransform
									attributeName="transform"
									type="translate"
									values="-12 0; 12 0; -12 0"
									dur="5.5s"
									repeatCount="indefinite"
								/>
							</path>

                            {/* jasna warstwa */}
							<path
								d="M-80 9 Q-40 -3 0 9 T80 9 T160 9 T240 9 T320 9 T400 9 L400 350 L-80 350 Z"
								fill={`url(#${waterId})`}
								opacity="0.96"
							>
								<animateTransform
									attributeName="transform"
									type="translate"
									values="14 0; -14 0; 14 0"
									dur="7s"
									repeatCount="indefinite"
								/>
							</path>

							{/* ciemna warstwa */}
							<path
								d="M-80 20 Q-40 11 0 20 T80 20 T160 20 T240 20 T320 20 T400 20 L400 350 L-80 350 Z"
								fill="#082b62"
								opacity="0.22"
							>
								<animateTransform
									attributeName="transform"
									type="translate"
									values="-9 0; 9 0; -9 0"
									dur="8.5s"
									repeatCount="indefinite"
								/>
							</path>
						</g>

						<circle
							cx={center}
							cy={center}
							r={radius}
							fill={`url(#${depthId})`}
							pointerEvents="none"
						/>
					</g>

					{/* procent */}
					<text
						x={center}
						y={center + 14}
						textAnchor="middle"
						fill="#f8fafc"
						fontSize="43"
						fontWeight="500"
						style={{
							filter: "drop-shadow(0 2px 5px rgba(2,6,23,0.6))",
						}}
					>
						{Math.round(value)}%
					</text>
				</svg>
			</div>
		</section>
	);
}
