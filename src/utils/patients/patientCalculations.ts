/**
 * Calcula la edad a partir de una fecha de nacimiento en formato ISO string.
 * @param birthDate string (YYYY-MM-DD)
 * @returns number
 */
export function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

export function calculateBMI(weight: number, height: number): number {
    const heightM = height / 100;
    return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function getBMILabel(bmi: number): string {
    if (bmi < 18.5) return 'Bajo peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    if (bmi < 35) return 'Obesidad Clase 1';
    if (bmi < 40) return 'Obesidad Clase 2';
    return 'Obesidad Clase 3';
}

