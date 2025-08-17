import { useCallback, useMemo } from "react";
import { type DateData, Calendar } from "react-native-calendars";
import type { Direction, MarkedDates } from "react-native-calendars/src/types";
import { useCalendar } from "../calendar-context";
import Header from "./header";
import CustomArrow from "./arrows";
import CustomDay, { type CustomDayProps } from "./day";
import { calendarThemeOverride } from "./theme";
import { format } from "date-fns";

export const DayView = () => {
  const { date, updateDate, setSelectedDate, selectedDate, toggleIsOpen } = useCalendar();

  const headerTitle = format(date, "MMMM yyyy");
  const initialDate = format(date, "yyyy-MM-dd");

  const handleMonthChange = useCallback(
    (data: DateData) => {
      console.log("~ handleMonthChange:", data);
      const newDate = new Date(data.dateString);
      updateDate(newDate);
    },
    [updateDate]
  );

  const handleDayPress = useCallback(
    (data: DateData) => {
      const { dateString } = data;
      console.log("~ handleDayPress:", dateString);
      const newDate = new Date(dateString);
      console.log("xdate log", newDate);
      setSelectedDate(newDate);
      updateDate(newDate);
      toggleIsOpen();
    },
    [toggleIsOpen, updateDate, setSelectedDate]
  );

  const renderArrow = useCallback(
    (direction: Direction) => <CustomArrow direction={direction} />,
    []
  );

  const renderDay = useCallback((data: CustomDayProps) => <CustomDay {...data} />, []);

  const markedDate = useMemo<MarkedDates>(() => {
    const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
    return selectedDate
      ? {
          [formattedDate]: {
            selected: true,
            selectedColor: "blue",
          },
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
      testID="day-view"
      theme={calendarThemeOverride}
    />
  );
};
