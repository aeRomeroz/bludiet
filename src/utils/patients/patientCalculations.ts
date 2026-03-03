/**
 * Calcula la edad a partir de una fecha de nacimiento en formato ISO string.
 * @param birthDate string (YYYY-MM-DD)
 * @returns number
 */
export const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Si el mes actual es menor al de nacimiento, 
    // o es el mismo mes pero el día actual es menor, aún no cumple años.
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
};