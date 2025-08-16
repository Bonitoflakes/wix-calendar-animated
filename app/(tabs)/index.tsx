import { StyleSheet, View } from "react-native";
import { useCallback, useMemo } from "react";
import { Calendar, type DateData } from "react-native-calendars";
import type { Direction, MarkedDates, Theme } from "react-native-calendars/src/types";

import CustomArrow from "@/components/calendar/arrows";
import CustomDay, { type CustomDayProps } from "@/components/calendar/day";
import Title from "@/components/calendar/title";
import { MonthWrapper } from "@/components/month";
import Year from "@/components/year";
import { CalendarProvider, useCalendarContext } from "@/components/calendarContext";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XDate = require("xdate");

export default function TabThreeScreen() {
  return (
    <CalendarProvider>
      <Shell />
    </CalendarProvider>
  );
}

const Shell = () => {
  const { step } = useCalendarContext();
  return (
    <View style={styles.container}>
      {step === 1 && <MyCalendar />}
      {step === 2 && <MonthWrapper />}
      {step === 3 && <Year />}
    </View>
  );
};

const MyCalendar = () => {
  const { incrementStep, date, setDate, setSelectedDate, selectedDate } =
    useCalendarContext();

  const _headerTitle = date.toString("MMMM yyyy");
  const _initialDate = date.toString("i").split("T")[0];

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
      setSelectedDate(dateString);
      console.log("~ Selected date:", dateString);
    },
    [setSelectedDate]
  );

  const renderArrow = useCallback(
    (direction: Direction) => <CustomArrow direction={direction} />,
    []
  );

  const renderDay = useCallback((data: CustomDayProps) => <CustomDay {...data} />, []);

  const markedDate = useMemo<MarkedDates>(() => {
    return selectedDate
      ? {
          [selectedDate]: { selected: true, selectedColor: "blue" },
        }
      : {};
  }, [selectedDate]);

  return (
    <Calendar
      enableSwipeMonths
      hideExtraDays
      markedDates={markedDate}
      onDayPress={handleDayPress}
      initialDate={_initialDate}
      renderArrow={renderArrow}
      onMonthChange={handleMonthChange}
      dayComponent={renderDay}
      customHeaderTitle={<Title title={_headerTitle} incrementStep={incrementStep} />}
      disableAllTouchEventsForDisabledDays
      testID="CustomCalendar"
      theme={customTheme}
    />
  );
};

const customTheme: Theme = {
  // @ts-expect-error
  "stylesheet.calendar.main": {
    container: {
      padding: 20,
      backgroundColor: "white",
      borderRadius: 8,
    },
    week: {
      marginTop: 10 * 1.5,
      gap: 10,
      flexDirection: "row",
      justifyContent: "space-around",
    },
  },
  "stylesheet.calendar.header": {
    header: {
      // paddingHorizontal: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    week: {
      marginTop: 16,
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 10,
    },
    dayHeader: {
      marginTop: 2,
      flex: 1,
      textAlign: "center",
      fontSize: 15,
      fontFamily: "Lato",
      fontWeight: 700,
      color: "#5A5A5A",
      // backgroundColor: "pink",
      // borderWidth: 1,
    },
  },
  arrowStyle: {
    backgroundColor: "#F2F2F5",
    padding: 0,
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    padding: 20,
    paddingTop: 200,
    width: "100%",
  },
  customHeaderTitle: {},
});
