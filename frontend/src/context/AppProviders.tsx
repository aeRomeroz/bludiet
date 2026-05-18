import type { ReactNode } from "react";
import { PatientsProvider } from "./PatientsContext";
import { DietsProvider } from "./DietsContext";
import { AuthProvider } from "./AuthContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <PatientsProvider>
        <DietsProvider>
          {children}
        </DietsProvider>
      </PatientsProvider>
    </AuthProvider>
  );
}
