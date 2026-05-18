import { supabase } from '../lib/supabase';
import type { LoginCredentials, RegisterCredentials } from '../types/auth'; // Tipos que crearemos ahora

export const authService = {
    // 1. Registro de nuevos Dietistas
    register: async (credentials: RegisterCredentials) => {
        const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
                data: {
                    first_name: credentials.firstName,
                    last_name: credentials.lastName,
                    birth_date: credentials.birthDate,
                    phone: credentials.phone,
                }
            }
        });

        if (error) throw new Error(error.message);
        return data;
    },

    // 2. Inicio de Sesión
    login: async ({ email, password }: LoginCredentials) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw new Error(error.message);
        return data; // Aquí viene la sesión con el JWT en data.session.access_token
    },

    // 3. Cerrar Sesión
    logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
    },

    // 4. Obtener el usuario actual logueado (útil al recargar la página)
    getCurrentUser: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};