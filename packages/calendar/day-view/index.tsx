import { useCallback, useMemo, useState } from "react";
import { type DateData, Calendar } from "react-native-calendars";
import type { Direction, MarkedDates } from "react-native-calendars/src/types";
import { useCalendar } from "../calendar-context";
import Header from "./header";
import CustomArrow from "./arrows";
import CustomDay, { type CustomDayProps } from "./day";
import { calendarThemeOverride } from "./theme";
import { format } from "date-fns";
import { Pressable, View, Text } from "react-native";

export const DayView = () => {
  const {
    internalDate,
    updateInternalDate,
    setSelectedDate,
    selectedDate,
    onChange,
    toggleIsOpen,
    resetInternals,
  } = useCalendar();

  const headerTitle = format(internalDate, "MMMM yyyy");
  const initialDate = format(internalDate, "yyyy-MM-dd");

  const [isDisabled, setIsDisabled] = useState(true);

  const handleMonthChange = useCallback(
    (data: DateData) => {
      console.log("~ handleMonthChange:", data);
      const newDate = new Date(data.dateString);
      updateInternalDate(newDate);
    },
    [updateInternalDate]
  );

  const handleDayPress = useCallback(
    (data: DateData) => {
      const { dateString } = data;
      console.log("~ handleDayPress:", dateString);
      const newDate = new Date(dateString);
      console.log("xdate log", newDate);
      setSelectedDate(newDate);
      updateInternalDate(newDate);
      setIsDisabled(false);
    },
    [updateInternalDate, setSelectedDate]
  );

  const handleConfirm = () => {
    toggleIsOpen();
    // save global state.
    if (onChange && selectedDate) {
      onChange(selectedDate);
    }
    // reset internal state.
    resetInternals();
  };

  const handleCancel = () => {
    toggleIsOpen();
    // reset internal state.
    resetInternals();
  };

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
    <View>
      <Calendar
        enableSwipeMonths
        hideExtraDays
        markedDates={markedDate}
        onDayPress={handleDayPress}
        current={initialDate}
        renderArrow={renderArrow}
        onMonthChange={handleMonthChange}
        dayComponent={renderDay}
        customHeaderTitle={<Header title={headerTitle} />}
        disableAllTouchEventsForDisabledDays
        testID="day-view"
        theme={calendarThemeOverride}
      />
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", padding: 16, gap: 16 }}
      >
        <Pressable
          onPress={handleCancel}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 18,
            backgroundColor: "#0466C833",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#0466C8" }}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={handleConfirm}
          style={[
            {
              paddingVertical: 12,
              paddingHorizontal: 18,
              backgroundColor: "#0400D1",
              borderRadius: 8,
            },
            isDisabled && {
              opacity: 0.5,
            },
          ]}
        >
          <Text style={{ color: "white" }}>Set Date</Text>
        </Pressable>
      </View>
    </View>
  );
};
