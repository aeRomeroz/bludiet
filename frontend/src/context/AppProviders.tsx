import type { ReactNode } from "react";
import { PatientsProvider } from "./PatientsContext";
import { DietsProvider } from "./DietsContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <PatientsProvider>
      <DietsProvider>
        {children}
      </DietsProvider>
    </PatientsProvider>
  );
}
