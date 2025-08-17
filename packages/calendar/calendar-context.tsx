import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// day | month | year
const _MIN_STEPS = 1;
const _MAX_STEPS = 3;

type CalendarActions = {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;

  incrementStep: () => void;
  decrementStep: () => void;
  toggleModal: () => void;

  updateDraftDate: (date: Date) => void;
  resetInternals: () => void;
};

type CalendarState = {
  step: number;
  draftDate: Date;
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

  const [draftDate, setDraftDate] = useState(() => {
    if (value) return value;
    return new Date();
  }); // local date state. It's internal use only.

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value); // This is used for marking selected dates and placeholder for global date onChange

  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (value) {
      console.log("Hook form value has changed", value);
      setSelectedDate(value);
      setDraftDate(value);
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

  const updateDraftDate = useCallback((date: Date) => setDraftDate(date), []);

  const resetInternals = useCallback(() => {
    const initialDate = value ?? new Date();
    const selectedDate = value ?? undefined;
    console.log("Resetting internals with:", initialDate, selectedDate);
    setDraftDate(initialDate);
    setSelectedDate(selectedDate);
  }, [value]);

  const contextValues = {
    step,
    value,
    draftDate,
    selectedDate,
    isOpen,
    toggleModal,
    onChange,
    setSelectedDate,
    updateDraftDate,
    incrementStep,
    decrementStep,
    resetInternals,
  };

  return (
    <CalendarContext.Provider value={contextValues}>{children}</CalendarContext.Provider>
  );
};

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
