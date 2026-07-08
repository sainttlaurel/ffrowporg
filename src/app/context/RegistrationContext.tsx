import { createContext, useContext, useState, type ReactNode } from "react";

interface RegistrationContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <RegistrationContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

/** Hook to open/close the registration modal from any component. */
export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistration must be used inside <RegistrationProvider>");
  return ctx;
}
