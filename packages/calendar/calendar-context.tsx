import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XDate = require("xdate");

const today: XDate = new XDate();

const _MAX_STEPS = 3;
const _MIN_STEPS = 1;

type CalendarActions = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDate: React.Dispatch<React.SetStateAction<XDate>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<XDate | null>>;
  incrementStep: () => void;
  decrementStep: () => void;
  updateMonth: (month: number) => void;
  updateYear: (year: number) => void;
  updatePaddingTop: (value: number) => void;
  toggleIsOpen: () => void;
};

type CalendarState = {
  step: number;
  date: XDate;
  selectedDate: XDate | null;
  paddingTop: number;
  isOpen: boolean;
};

type CalendarContextProps = CalendarActions & CalendarState;

const CalendarContext = createContext<CalendarContextProps | null>(null);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(today);
  const [isOpen, setIsOpen] = useState(false);
  const [paddingTop, setPaddingTop] = useState(0);
  const [selectedDate, setSelectedDate] = useState<XDate | null>(null);

  const toggleIsOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const incrementStep = useCallback(
    () => setStep((p) => Math.min(p + 1, _MAX_STEPS)),
    []
  );
  const decrementStep = useCallback(
    () => setStep((p) => Math.max(p - 1, _MIN_STEPS)),
    []
  );

  const updatePaddingTop = useCallback((value: number) => {
    setPaddingTop(value);
  }, []);

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

  const value = useMemo(() => {
    return {
      step,
      date,
      selectedDate,
      paddingTop,
      isOpen,
      updatePaddingTop,
      toggleIsOpen,
      setStep,
      setDate,
      setSelectedDate,
      incrementStep,
      decrementStep,
      updateMonth,
      updateYear,
    };
  }, [
    step,
    date,
    selectedDate,
    paddingTop,
    isOpen,
    updatePaddingTop,
    toggleIsOpen,
    incrementStep,
    decrementStep,
    updateMonth,
    updateYear,
  ]);

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
