import { calculateGramsFromKcalPercentage, KCAL_PER_GRAM, calculateDayMacros, buildDietFromSetup} from '../../../src/utils/diets/dietMath';
import type { Diet, DietSetupData } from '../../../src/types/diet';

describe('Pruebas unitarias para los calculos en las Dietas (dietMath.ts)', () => {

    //PROTE
    it('Debería calcular correctamente los gramos de Proteína (4 Kcal/g)', () => {
        const proteinPercentage = 30;
        const totalKcal = 2000;
        const kcalPerGram = KCAL_PER_GRAM.PROTEIN;
        const awaitedResult = 150;

        const actualResult = calculateGramsFromKcalPercentage(proteinPercentage, kcalPerGram, totalKcal);

        expect(actualResult).toBe((awaitedResult));
    });

    //CARBS
    it('Debería calcular correctamente los gramos de Carbohidratos (4 Kcal/g)', () => {
        const carbPercentage = 45;
        const totalKcal = 2200;
        const kcalPerGram = KCAL_PER_GRAM.CARBS;
        const awaitedResult = 248;

        const actualResult = calculateGramsFromKcalPercentage(carbPercentage, kcalPerGram, totalKcal);

        expect(actualResult).toBe(awaitedResult);
    });

    //GRASAS
    it('Debería calcular correctamente los gramos de Grasas (9 Kcal/g)', () => {
        const fatPercentage = 25;
        const totalKcal = 1800;
        const kcalPerGram = KCAL_PER_GRAM.FATS;
        const awaitedResult = 50;

        const actualResult = calculateGramsFromKcalPercentage(fatPercentage, kcalPerGram, totalKcal);

        expect(actualResult).toBe(awaitedResult);
    });

});

describe('Pruebas para calculateDayMacros', () => {

  it('Debería sumar correctamente los macronutrientes de los alimentos asignados a un día específico', () => {
    // 1. ARRANGE: Creamos una Dieta Mock (falsa) con la estructura mínima que necesita la función
    const mockDiet: Partial<Diet> = {
      id: 'diet-123',
      meals: [
        {
          id: 'meal-desayuno',
          name: 'Desayuno',
          orderIndex: 0,
          slots: [
            {
              id: 'slot-1',
              slotIndex: 0,
              items: [
                // Día 1 (Índice 0): El paciente come un plátano/huevo con estos macros
                { id: 'item-1', foodId: 'food-1', name: 'Alimento Pro', grams: 100, dayNumber: 1, kcal: 290, protein: 20, fats: 10, carbs: 30 },
                // Día 2 (Índice 1): Vacío (null)
                null 
              ]
            }
          ]
        }
      ]
    };

    // 2. ACT: Ejecutamos la función para el Día 1 (índice 0)
    // Usamos "as Diet" porque pasamos un objeto parcial simulado para no rellenar todo el tipado gigante
    const day1Result = calculateDayMacros(mockDiet as Diet, 0);
    const day2Result = calculateDayMacros(mockDiet as Diet, 1);

    // 3. ASSERT: Verificamos que las sumas sean exactas
    // Para comparar objetos en Jest, usamos .toEqual() en lugar de .toBe()
    expect(day1Result).toEqual({
      protein: 20,
      fats: 10,
      carbs: 30,
      kcal: 290
    });

    // Verificamos que el Día 2, al estar null, devuelva todo en 0 y no explote la app
    expect(day2Result).toEqual({
      protein: 0,
      fats: 0,
      carbs: 0,
      kcal: 0
    });
  });

});


describe('Pruebas para buildDietFromSetup (Factoría de Dietas)', () => {

  it('Debería estructurar correctamente una nueva dieta a partir de los datos del formulario de configuración', () => {
    const mockSetup: DietSetupData = {
      patientId: 'patient-abc',
      dietName: 'Dieta Hipertrofia',
      durationDays: 3, 
      targetKcal: 2500,
      macros: { protein: 150, fats: 70, carbs: 300 },
      startDate: new Date('2026-05-18'),
      selectedMeals: ['meal-desayuno', 'meal-almuerzo'] 
    };
    const mockDietId = 'generated-diet-id-999';

    const resultado = buildDietFromSetup(mockSetup, mockDietId);

    expect(resultado.id).toBe(mockDietId);
    expect(resultado.patientId).toBe(mockSetup.patientId);
    expect(resultado.name).toBe(mockSetup.dietName);
    expect(resultado.targetKcalPerDay).toBe(mockSetup.targetKcal);
    
    expect(resultado.days).toHaveLength(3);
    expect(typeof resultado.days[0].id).toEqual('string');
    expect(resultado.days[0].id).not.toEqual(''); 

    expect(resultado.meals).toHaveLength(2);
    expect(resultado.meals[0].name).toBeDefined(); 
    
    expect(resultado.meals[0].slots[0].items).toHaveLength(3);
    expect(resultado.meals[0].slots[0].items.every(item => item === null)).toBe(true);
  });

});