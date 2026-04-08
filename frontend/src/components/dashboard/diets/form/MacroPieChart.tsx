import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController, type ChartData } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { SetupMacros } from "../../../../types/diet";
import { calculateGramsFromKcalPercentage, KCAL_PER_GRAM } from "../../../../utils/diets/dietMath";

Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

interface MacroPieChartProps {
    // Modo objetivo 
    targetKcal?: number;
    targetMacros?: SetupMacros;
    // Modo real
    data?: {
        protein: number;
        fats: number;
        carbs: number;
        kcal: number;
        targetKcal: number;
    };
    showLegend?: boolean;
    size?: 'sm' | 'md';
}

const COLORS = {
    protein: '#396DB0',
    fats: '#80BF3A',
    carbs: '#E2C000',
    empty: 'rgba(200,200,200,0.3)',
};

export default function MacroPieChart({ targetKcal, targetMacros, data, showLegend = true,  size = 'md' }: MacroPieChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    // Calcular valores a mostrar
    const isEmpty = data ? data.kcal === 0 : false;
    
    let proteinValue: number, fatsValue: number, carbsValue: number;
    let proteinGrams: number | null = null;
    let fatsGrams: number | null = null;
    let carbsGrams: number | null = null;

    if (data) {
        const proteinKcal = data.protein * KCAL_PER_GRAM.PROTEIN;
        const fatsKcal = data.fats * KCAL_PER_GRAM.FATS;
        const carbsKcal = data.carbs * KCAL_PER_GRAM.CARBS;

        proteinValue = Math.round((proteinKcal / data.targetKcal) * 100);
        fatsValue = Math.round((fatsKcal / data.targetKcal) * 100);
        carbsValue = Math.round((carbsKcal / data.targetKcal) * 100);
    } else if (targetMacros && targetKcal) {
        // Modo objetivo: usar porcentajes
        proteinValue = targetMacros.protein;
        fatsValue = targetMacros.fats;
        carbsValue = targetMacros.carbs;
        
        proteinGrams = calculateGramsFromKcalPercentage(targetMacros.protein, KCAL_PER_GRAM.PROTEIN, targetKcal);
        fatsGrams = calculateGramsFromKcalPercentage(targetMacros.fats, KCAL_PER_GRAM.FATS, targetKcal);
        carbsGrams = calculateGramsFromKcalPercentage(targetMacros.carbs, KCAL_PER_GRAM.CARBS, targetKcal);
    } else {
        proteinValue = 0; fatsValue = 0; carbsValue = 0;
    }

    useEffect(() => {
        if (!canvasRef.current) return;

        const existingChart = Chart.getChart(canvasRef.current);
        if (existingChart) existingChart.destroy();

        const chartData: ChartData<'pie'> = isEmpty ? {
                datasets: [{
                    data: [1],
                    backgroundColor: [COLORS.empty],
                    borderWidth: 0,
                }]
            }
            : {
                labels: ['Proteínas', 'Grasas', 'Carbos'],
                datasets: [{
                    data: [proteinValue, fatsValue, carbsValue],
                    backgroundColor: [COLORS.protein, COLORS.fats, COLORS.carbs],
                    borderColor: [COLORS.protein, COLORS.fats, COLORS.carbs],
                    borderWidth: 1,
                }]
            };

        chartRef.current = new Chart(canvasRef.current, {
            type: 'pie',
            data: chartData,
            options: {
                responsive: size !== 'sm',
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: !isEmpty },
                    datalabels: {
                        display: !isEmpty,
                        color: '#fff',
                        font: { weight: 'bold', size: size === 'sm' ? 8 : 11 },
                        formatter: (value: number) => `${value}%`,
                    }
                }
            }
        });

        return () => {
            chartRef.current?.destroy();
            chartRef.current = null;
        };
    }, [targetKcal, targetMacros, data, isEmpty, size]);

    return (
        <div className="flex flex-col gap-3">
            <canvas 
                ref={canvasRef}
                width={size === 'sm' ? 54 : undefined}
                height={size === 'sm' ? 54 : undefined}
            />

            {showLegend && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ background: COLORS.protein }} />
                            <span className="text-xs text-gray-secondary">Proteínas</span>
                        </div>
                        <span className="text-xs font-bold text-black-primary">
                            {proteinGrams !== null ? `${proteinGrams}g · ${targetMacros?.protein}%` : `${proteinValue}g`}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ background: COLORS.fats }} />
                            <span className="text-xs text-gray-secondary">Grasas</span>
                        </div>
                        <span className="text-xs font-bold text-black-primary">
                            {fatsGrams !== null ? `${fatsGrams}g · ${targetMacros?.fats}%` : `${fatsValue}g`}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ background: COLORS.carbs }} />
                            <span className="text-xs text-gray-secondary">Carbos</span>
                        </div>
                        <span className="text-xs font-bold text-black-primary">
                            {carbsGrams !== null ? `${carbsGrams}g · ${targetMacros?.carbs}%` : `${carbsValue}g`}
                        </span>
                    </div>
                </div>
            )}

            {data && !isEmpty && (
                <p className="text-xs text-center text-gray-secondary font-medium">{data.kcal} kcal</p>
            )}
        </div>
    );
}