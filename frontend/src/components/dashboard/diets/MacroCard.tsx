interface MacroCardProps {
    label: string;
    color: string; // Tailwind class como 'text-blue-brand'
    grams: number;
}

export const MacroCard = ({ label, color, grams }: MacroCardProps) => (
    <div className="bg-white border border-primary-30 p-3 rounded-xl text-center shadow-sm">
        <p className={`text-[10px] font-bold ${color} uppercase mb-1`}>{label}</p>
        <p className="text-xl font-bold text-black-primary">
            {grams}<span className="text-xs ml-0.5 text-gray-secondary">g</span>
        </p>
    </div>
);