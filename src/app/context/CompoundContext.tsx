import { createContext, useContext, useState } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

export const COMPOUNDS_BY_DEVELOPER: Record<string, string[]> = {
  'Palm Hills': ['Palm Hills Katameya', 'Palm Hills October'],
  'Sodic':      ['Sodic West', 'Sodic East'],
  'Hyde Park':  ['Hyde Park', 'Hyde Park New Cairo'],
  'New Zayed':  ['New Zayed Phase II', 'New Zayed Phase III'],
};

export const DEVELOPERS = Object.keys(COMPOUNDS_BY_DEVELOPER);

// ─── Context ──────────────────────────────────────────────────────────────────

type CompoundContextValue = {
  /** Active property developer */
  activeDeveloper: string;
  setActiveDeveloper: (developer: string) => void;
  /** Active compound — all page actions are scoped to this */
  activeCompound: string;
  setActiveCompound: (compound: string) => void;
  /** All compounds available to the active developer */
  availableCompounds: string[];
};

const CompoundContext = createContext<CompoundContextValue | null>(null);

export function CompoundProvider({ children }: { children: React.ReactNode }) {
  const [activeDeveloper, setActiveDeveloperRaw] = useState(DEVELOPERS[0]);
  const [activeCompound, setActiveCompound] = useState(
    COMPOUNDS_BY_DEVELOPER[DEVELOPERS[0]][0]
  );

  function setActiveDeveloper(developer: string) {
    setActiveDeveloperRaw(developer);
    // Auto-select first compound of the new developer
    setActiveCompound(COMPOUNDS_BY_DEVELOPER[developer][0]);
  }

  const availableCompounds = COMPOUNDS_BY_DEVELOPER[activeDeveloper];

  return (
    <CompoundContext.Provider value={{
      activeDeveloper,
      setActiveDeveloper,
      activeCompound,
      setActiveCompound,
      availableCompounds,
    }}>
      {children}
    </CompoundContext.Provider>
  );
}

export function useCompound() {
  const ctx = useContext(CompoundContext);
  if (!ctx) throw new Error('useCompound must be used inside CompoundProvider');
  return ctx;
}
