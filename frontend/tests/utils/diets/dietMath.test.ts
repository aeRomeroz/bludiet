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
    //ARRANGE
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
                { id: 'item-1', foodId: 'food-1', name: 'Alimento Pro', grams: 100, dayNumber: 1, kcal: 290, protein: 20, fats: 10, carbs: 30 },
                null 
              ]
            }
          ]
        }
      ]
    };

    // ACT
    const day1Result = calculateDayMacros(mockDiet as Diet, 0);
    const day2Result = calculateDayMacros(mockDiet as Diet, 1);

    //ASSERT
    expect(day1Result).toEqual({
      protein: 20,
      fats: 10,
      carbs: 30,
      kcal: 290
    });

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
    //ARRANGE
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

    // ACT
    const result = buildDietFromSetup(mockSetup, mockDietId);

    //ASSERT
    expect(result.id).toBe(mockDietId);
    expect(result.patientId).toBe(mockSetup.patientId);
    expect(result.name).toBe(mockSetup.dietName);
    expect(result.targetKcalPerDay).toBe(mockSetup.targetKcal);
    
    expect(result.days).toHaveLength(3);
    expect(typeof result.days[0].id).toEqual('string');
    expect(result.days[0].id).not.toEqual(''); 

    expect(result.meals).toHaveLength(2);
    expect(result.meals[0].name).toBeDefined(); 
    
    expect(result.meals[0].slots[0].items).toHaveLength(3);
    expect(result.meals[0].slots[0].items.every(item => item === null)).toBe(true);
  });

});