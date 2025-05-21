import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState, type JSX } from "react";
import { Calendar, type DateData } from "react-native-calendars";
import type { Direction, MarkedDates, Theme } from "react-native-calendars/src/types";

import CustomArrow from "@/components/calendar/arrows";
import CustomDay, { type CustomDayProps } from "@/components/calendar/day";
import Title from "@/components/calendar/title";
import Month from "@/components/steps/Month";
import Year from "@/components/steps/Year";
import type { BasicDayProps } from "react-native-calendars/src/calendar/day/basic";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XDate = require("xdate");

const today: XDate = new XDate();

const _MAX_STEPS = 3;
const _MIN_STEPS = 1;

export default function TabThreeScreen() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const _headerTitle = date.toString("MMMM yyyy");
  const _initialDate = date.toString("i").split("T")[0];

  const markedDate = useMemo<MarkedDates>(() => {
    return selectedDate
      ? {
          [selectedDate]: { selected: true, selectedColor: "blue" },
        }
      : {};
  }, [selectedDate]);

  const onNextStep = () => setStep((p) => Math.min(p + 1, _MAX_STEPS));
  const onPrevStep = () => setStep((p) => Math.max(p - 1, _MIN_STEPS));

  const handleMonthChange = useCallback((data: DateData) => {
    const dateString = data.dateString;
    setDate(new XDate(dateString));
  }, []);

  const handleDayPress = useCallback((data: DateData) => {
    const { dateString } = data;
    setSelectedDate(dateString);
    console.log("~ Selected date:", dateString);
  }, []);

  const _updateMonth = useCallback(
    (month: number) => {
      if (month < 0 || month > 11) throw new Error("Invalid month");
      const newDate = new XDate(date);
      newDate.setMonth(month);
      setDate(newDate);
    },
    [date]
  );

  const _updateYear = useCallback(
    (year: number) => {
      if (year < 1970 || year > 2100) throw new Error("Invalid year");
      const newDate = new XDate(date);
      newDate.setFullYear(year);
      setDate(newDate);
    },
    [date]
  );

  const renderArrow = useCallback(
    (direction: Direction) => <CustomArrow direction={direction} />,
    []
  );

  const renderDay = useCallback((data: CustomDayProps) => <CustomDay {...data} />, []);

  return (
    <View style={styles.container}>
      {step === 1 && (
        <CustomCalendar
          onNext={onNextStep}
          markedDate={markedDate}
          handleDayPress={handleDayPress}
          _initialDate={_initialDate}
          handleMonthChange={handleMonthChange}
          _headerTitle={_headerTitle}
          renderArrow={renderArrow}
          renderDay={renderDay}
        />
      )}

      {step === 2 && (
        <Month
          onNext={onNextStep}
          onBack={onPrevStep}
          currentDate={date}
          updateMonth={_updateMonth}
          updateYear={_updateYear}
        />
      )}

      {step === 3 && (
        <Year onBack={onPrevStep} updateYear={_updateYear} currentDate={date} />
      )}
    </View>
  );
}

type CustomCalendarProps = {
  markedDate: MarkedDates | undefined;
  handleDayPress: (data: DateData) => void;
  _initialDate: string;
  handleMonthChange: (data: DateData) => void;
  _headerTitle: string;
  onNext: () => void;
  renderArrow: (direction: Direction) => JSX.Element;
  renderDay: (data: CustomDayProps) => JSX.Element;
};

const customTheme: Theme = {
  arrowStyle: {
    backgroundColor: "#F2F2F5",
    padding: 0,
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  "stylesheet.calendar.main": {
    container: {
      padding: 20,
      backgroundColor: "white",
      borderRadius: 8,
    },
  },
  "stylesheet.calendar.header": {
    header: {
      paddingLeft: 8,
      paddingRight: 8,
      marginTop: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    week: {
      marginTop: 16,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      flex: 1,
      textAlign: "center",
      fontSize: 12,
      fontFamily: "Lato",
      fontWeight: 700,
      color: "#5A5A5A",
    },
  },
};

const CustomCalendar = ({
  markedDate,
  handleDayPress,
  _initialDate,
  handleMonthChange,
  _headerTitle,
  onNext,
  renderArrow,
  renderDay,
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
        dayComponent={renderDay}
        customHeaderTitle={<Title title={_headerTitle} onNext={onNext} />}
        disableAllTouchEventsForDisabledDays
        testID="CustomCalendar"
        theme={customTheme}
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
