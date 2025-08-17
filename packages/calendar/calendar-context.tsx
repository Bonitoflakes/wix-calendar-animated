import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

const today = new Date();
const _MAX_STEPS = 3;
const _MIN_STEPS = 1;

type CalendarActions = {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;

  incrementStep: () => void;
  decrementStep: () => void;
  toggleIsOpen: () => void;

  updateDate: (date: Date) => void;
};

type CalendarState = {
  step: number;
  date: Date;
  selectedDate: Date | null;
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

  const [date, setInternalDate] = useState(() => {
    if (value) return value;
    return today;
  }); // local date state synced to hook form.

  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // This is used for marking selected dates. It's internal use only.

  const toggleIsOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const incrementStep = useCallback(
    () => setStep((p) => Math.min(p + 1, _MAX_STEPS)),
    []
  );
  const decrementStep = useCallback(
    () => setStep((p) => Math.max(p - 1, _MIN_STEPS)),
    []
  );

  const updateDate = (date: Date) => {
    setInternalDate(date);
    if (onChange) onChange(date);
  };

  const memoedValues = {
    step,
    date,
    selectedDate,
    isOpen,
    onChange,
    toggleIsOpen,
    setSelectedDate,
    incrementStep,
    decrementStep,
    updateDate,
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
