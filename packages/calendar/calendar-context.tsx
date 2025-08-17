import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const _MAX_STEPS = 3;
const _MIN_STEPS = 1;

type CalendarActions = {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;

  incrementStep: () => void;
  decrementStep: () => void;
  toggleIsOpen: () => void;

  updateInternalDate: (date: Date) => void;
  resetInternals: () => void;
};

type CalendarState = {
  step: number;
  internalDate: Date;
  selectedDate?: Date;
  isOpen: boolean;
};

type ControlledCalendarProps = {
  name?: string;
  value?: Date;
  onChange?: (date: Date) => void;
};

type ICalendarContext = CalendarActions & CalendarState & ControlledCalendarProps;

const CalendarContext = createContext<ICalendarContext | null>(null);

export const CalendarProvider = ({
  children,
  value,
  onChange,
}: {
  children: ReactNode;
} & ControlledCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false); // show or hide calendar modal
  const [step, setStep] = useState(1); // control which view is shown

  const [internalDate, setInternalDate] = useState(() => {
    if (value) return value;
    return new Date();
  }); // local date state synced to hook form.

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value); // This is used for marking selected dates. It's internal use only.

  const toggleIsOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      updateInternalDate(value);
    }
  }, [value]);

  const incrementStep = useCallback(
    () => setStep((p) => Math.min(p + 1, _MAX_STEPS)),
    []
  );
  const decrementStep = useCallback(
    () => setStep((p) => Math.max(p - 1, _MIN_STEPS)),
    []
  );

  const updateInternalDate = (date: Date) => {
    setInternalDate(date);
    // if (onChange) onChange(date);
  };

  const resetInternals = () => {
    const initialDate = value ?? new Date();
    const selectedDate = value ?? undefined;
    setInternalDate(initialDate);
    setSelectedDate(selectedDate);
  };

  const memoedValues = {
    step,
    value,
    internalDate,
    selectedDate,
    isOpen,
    onChange,
    toggleIsOpen,
    setSelectedDate,
    incrementStep,
    decrementStep,
    updateInternalDate,
    resetInternals,
  };

  return (
    <CalendarContext.Provider value={memoedValues}>{children}</CalendarContext.Provider>
  );
};

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
