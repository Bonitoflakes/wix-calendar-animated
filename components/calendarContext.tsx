import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XDate = require("xdate");

const today: XDate = new XDate();

const _MAX_STEPS = 3;
const _MIN_STEPS = 1;

type CalendarContextProps = {
  step: number;
  date: XDate;
  selectedDate: string | null;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDate: React.Dispatch<React.SetStateAction<XDate>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  incrementStep: () => void;
  decrementStep: () => void;
  updateMonth: (month: number) => void;
  updateYear: (year: number) => void;
};

const CalendarContext = createContext<CalendarContextProps | null>(null);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const incrementStep = useCallback(
    () => setStep((p) => Math.min(p + 1, _MAX_STEPS)),
    []
  );
  const decrementStep = useCallback(
    () => setStep((p) => Math.max(p - 1, _MIN_STEPS)),
    []
  );

  const updateMonth = useCallback((month: number) => {
    if (month < 0 || month > 11) return;

    setDate((prevDate) => {
      const newDate = new XDate(prevDate);
      newDate.setMonth(month);
      return newDate;
    });
  }, []);

  const updateYear = useCallback((year: number) => {
    if (year < 1970 || year > 2100) return;

    setDate((prevDate) => {
      const newDate = new XDate(prevDate);
      newDate.setFullYear(year);
      return newDate;
    });
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        step,
        date,
        selectedDate,
        setStep,
        setDate,
        setSelectedDate,
        updateMonth,
        updateYear,
        incrementStep,
        decrementStep,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendarContext must be used within a CalendarProvider");
  }
  return context;
}
