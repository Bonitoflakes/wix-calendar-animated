import { useCallback, useMemo } from "react";
import { type DateData, Calendar } from "react-native-calendars";
import type { Direction, MarkedDates } from "react-native-calendars/src/types";
import { useCalendarContext } from "../calendarContext";
import Header from "./header";
import CustomArrow from "./arrows";
import CustomDay, { type CustomDayProps } from "./day";
import { calendarThemeOverride } from "./theme";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XDate = require("xdate");

export const MyCalendar = ({ closeModal }: { closeModal: () => void }) => {
  const { date, setDate, setSelectedDate, selectedDate } = useCalendarContext();

  const headerTitle = date.toString("MMMM yyyy");
  const initialDate = date.toString("i").split("T")[0];

  const handleMonthChange = useCallback(
    (data: DateData) => {
      const dateString = data.dateString;
      setDate(new XDate(dateString));
    },
    [setDate]
  );

  const handleDayPress = useCallback(
    (data: DateData) => {
      const { dateString } = data;
      console.log("~ handleDayPress:", dateString);
      const newDate = new XDate(dateString);
      console.log("xdate", newDate);
      setSelectedDate(newDate);
      closeModal();
    },
    [closeModal, setSelectedDate]
  );

  const renderArrow = useCallback(
    (direction: Direction) => <CustomArrow direction={direction} />,
    []
  );

  const renderDay = useCallback((data: CustomDayProps) => <CustomDay {...data} />, []);

  const markedDate = useMemo<MarkedDates>(() => {
    return selectedDate
      ? {
          [selectedDate.toString('yyyy-MM-dd')]: { selected: true, selectedColor: "blue" },
        }
      : {};
  }, [selectedDate]);

  return (
    <Calendar
      enableSwipeMonths
      hideExtraDays
      markedDates={markedDate}
      onDayPress={handleDayPress}
      initialDate={initialDate}
      renderArrow={renderArrow}
      onMonthChange={handleMonthChange}
      dayComponent={renderDay}
      customHeaderTitle={<Header title={headerTitle} />}
      disableAllTouchEventsForDisabledDays
      testID="CustomCalendar"
      theme={calendarThemeOverride}
    />
  );
};
