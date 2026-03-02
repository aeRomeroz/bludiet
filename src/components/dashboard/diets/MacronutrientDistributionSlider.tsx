import * as Slider from '@radix-ui/react-slider';

// Usamos la interfaz que definimos para que sea coherente con tu dominio
interface Macros {
  p: number; // Proteína %
  g: number; // Grasa %
  c: number; // Carbohidratos %
}

interface Props {
  value: Macros;
  onChange: (newMacros: Macros) => void;
}

export default function MacronutrientDistributionSlider({ value, onChange }: Props) {
  /**
   * Radix maneja puntos en una línea. Para 3 macros necesitamos 2 puntos:
   * Punto 1: Fin de Proteína (value.p)
   * Punto 2: Fin de Proteína + Grasa (value.p + value.g)
   */
  const internalValues = [value.p, value.p + value.g];

  const handleValueChange = (newRange: number[]) => {
    const [pEnd, pgEnd] = newRange;

    onChange({
      p: pEnd,
      g: pgEnd - pEnd,
      c: 100 - pgEnd,
    });
  };

  return (
    <div className="space-y-4 w-full">
      {/* HEADER: Etiquetas y porcentajes */}
      <div className="flex justify-between items-end mb-1">
        <label className="text-[10px] font-bold text-gray-primary uppercase tracking-widest">
          Distribución de Macros (%)
        </label>
        <div className="flex gap-2">
          <Badge label="P" value={value.p} color="text-blue-brand" bg="bg-blue-brand/10" border="border-blue-brand/20" />
          <Badge label="G" value={value.g} color="text-green-brand" bg="bg-green-brand/10" border="border-green-brand/20" />
          <Badge label="C" value={value.c} color="text-yellow-warning" bg="bg-yellow-warning/10" border="border-yellow-warning/20" />
        </div>
      </div>

      {/* SLIDER CORE */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={internalValues}
        max={100}
        step={1}
        minStepsBetweenThumbs={5} // Evita que un macro sea 0%
        onValueChange={handleValueChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2 overflow-hidden flex">
          {/* Segmento Proteína (Azul) */}
          <div 
            className="h-full bg-blue-brand transition-all duration-200" 
            style={{ width: `${value.p}%` }} 
          />
          {/* Segmento Grasa (Verde) */}
          <div 
            className="h-full bg-green-brand transition-all duration-200" 
            style={{ width: `${value.g}%` }} 
          />
          {/* Segmento Carbohidratos (Amarillo) */}
          <div 
            className="h-full bg-yellow-warning transition-all duration-200" 
            style={{ width: `${value.c}%` }} 
          />
        </Slider.Track>

        {/* Tirador 1: Divide P de G */}
        <Slider.Thumb
          className="block w-4 h-4 bg-white border-2 border-blue-brand shadow-md rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-brand/50 transition-transform cursor-grab active:cursor-grabbing"
          aria-label="Ajustar Proteína y Grasa"
        />
        
        {/* Tirador 2: Divide G de C */}
        <Slider.Thumb
          className="block w-4 h-4 bg-white border-2 border-yellow-warning shadow-md rounded-full hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-warning/50 transition-transform cursor-grab active:cursor-grabbing"
          aria-label="Ajustar Grasa y Carbohidratos"
        />
      </Slider.Root>
    </div>
  );
}

/** Componente auxiliar para las etiquetas superiores */
function Badge({ label, value, color, bg, border }: { label: string, value: number, color: string, bg: string, border: string }) {
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${bg} ${color} border ${border}`}>
      {label}: {value}%
    </span>
  );
}
