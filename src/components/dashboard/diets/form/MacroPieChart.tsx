import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController, type ChartData } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { SetupMacros } from "../../../../types/diet";
import { calculateGramsFromKcalPercentage, KCAL_PER_GRAM } from "../../../../utils/diets/dietMath";

Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

interface MacroPieChartProps {
    targetKcal: number;
    targetMacros: SetupMacros;
}

export default function MacroPieChart({ targetKcal, targetMacros }: MacroPieChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    const proteinGrams = calculateGramsFromKcalPercentage(targetMacros.protein, KCAL_PER_GRAM.PROTEIN, targetKcal);
    const fatGrams = calculateGramsFromKcalPercentage(targetMacros.fats, KCAL_PER_GRAM.FATS, targetKcal);
    const carbGrams = calculateGramsFromKcalPercentage(targetMacros.carbs, KCAL_PER_GRAM.CARBS, targetKcal);

    useEffect(() => {
        if (!canvasRef.current) return;

        const existingChart = Chart.getChart(canvasRef.current);
        if (existingChart) existingChart.destroy();

        const data: ChartData<'pie'> = {
            labels: ['Proteínas', 'Grasas', 'Carbos'],
            datasets: [{
                data: [targetMacros.protein, targetMacros.fats, targetMacros.carbs],
                backgroundColor: [
                    '#396DB0',   // blue-brand
                    '#80BF3A',    // green-brand
                    '#E2C000',    // yellow-warning
                ],
                borderColor: [
                    '#396DB0',   // blue-brand
                    '#80BF3A',    // green-brand
                    '#E2C000',    // yellow-warning
                ],
                borderWidth: 1,
            }]
        };

        chartRef.current = new Chart(canvasRef.current, {
            type: 'pie',
            data,
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold', size: 11 },
                        formatter: (value: number) => `${value}%`,
                    }
                }
            }
        });

        return () => {
            chartRef.current?.destroy();
            chartRef.current = null;
        };
    }, [targetKcal, targetMacros]);

    return (
        <div className="flex flex-col gap-3">
            <canvas ref={canvasRef} />
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-xs text-gray-secondary">Proteínas</span>
                    </div>
                    <span className="text-xs font-bold text-black-primary">{proteinGrams}g · {targetMacros.protein}%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-secondary">Grasas</span>
                    </div>
                    <span className="text-xs font-bold text-black-primary">{fatGrams}g · {targetMacros.fats}%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-xs text-gray-secondary">Carbos</span>
                    </div>
                    <span className="text-xs font-bold text-black-primary">{carbGrams}g · {targetMacros.carbs}%</span>
                </div>
            </div>
        </div>
    );
}