import { StyleSheet, View } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { Calendar, type DateData } from "react-native-calendars";
import type { Direction, MarkedDates, Theme } from "react-native-calendars/src/types";

import CustomArrow from "@/components/calendar/arrows";
import CustomDay, { type CustomDayProps } from "@/components/calendar/day";
import Title from "@/components/calendar/title";
import Month from "@/components/steps/Month";
import Year from "@/components/steps/Year";

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
      if (month < 0 || month > 11) return;

      const newDate = new XDate(date);
      newDate.setMonth(month);
      setDate(newDate);
    },
    [date]
  );

  const _updateYear = useCallback(
    (year: number) => {
      if (year < 1970 || year > 2100) return;

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
        <Calendar
          enableSwipeMonths
          hideExtraDays
          markedDates={markedDate}
          onDayPress={handleDayPress}
          initialDate={_initialDate}
          renderArrow={renderArrow}
          onMonthChange={handleMonthChange}
          dayComponent={renderDay}
          customHeaderTitle={<Title title={_headerTitle} onNext={onNextStep} />}
          disableAllTouchEventsForDisabledDays
          testID="CustomCalendar"
          theme={customTheme}
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
