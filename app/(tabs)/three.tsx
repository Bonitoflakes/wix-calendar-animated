import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, type DateData } from "react-native-calendars";
import type { Direction, MarkedDates } from "react-native-calendars/src/types";

import CustomArrow from "@/components/calendar/arrows";
import CustomDay from "@/components/calendar/day";
import Title from "@/components/calendar/title";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XDate = require("xdate");

const today = new XDate();
const _initialDate = today.toISOString().split("T")[0];

export default function TabThreeScreen() {
  const [date, setDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const _headerTitle = date.toString("MMMM yyyy");

  console.log("🚀🚀🚀 ~ TabThreeScreen ~ _headerTitle:", _headerTitle);

  const handleMonthChange = useCallback((data: DateData) => {
    const dateString = data.dateString;
    setDate(new XDate(dateString));
  }, []);

  const markedDate = useMemo<MarkedDates>(() => {
    return selectedDate
      ? {
          [selectedDate]: { selected: true, selectedColor: "blue" },
        }
      : {};
  }, [selectedDate]);

  const handleDayPress = useCallback((data: DateData) => {
    const { dateString } = data;
    setSelectedDate(dateString);
    console.log("~ Selected date:", dateString);
  }, []);

  return (
    <View style={styles.container}>
      <CustomCalendar
        markedDate={markedDate}
        handleDayPress={handleDayPress}
        _initialDate={_initialDate}
        handleMonthChange={handleMonthChange}
        _headerTitle={_headerTitle}
      />

      <Calendar />
    </View>
  );
}

type CustomCalendarProps = {
  markedDate: MarkedDates | undefined;
  handleDayPress: (data: DateData) => void;
  _initialDate: string;
  handleMonthChange: (data: DateData) => void;
  _headerTitle: string;
};

const renderArrow = useCallback(
  (direction: Direction) => <CustomArrow direction={direction} />,
  []
);

const CustomCalendar = ({
  markedDate,
  handleDayPress,
  _initialDate,
  handleMonthChange,
  _headerTitle,
}: CustomCalendarProps) => {
  return (
    <>
      <Calendar
        enableSwipeMonths
        hideExtraDays
        markedDates={markedDate}
        onDayPress={handleDayPress}
        initialDate={_initialDate}
        renderArrow={renderArrow}
        onMonthChange={(data) => handleMonthChange(data)}
        dayComponent={(data) => <CustomDay {...data} />}
        customHeaderTitle={<Title title={_headerTitle} />}
      />
    </>
  );
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
