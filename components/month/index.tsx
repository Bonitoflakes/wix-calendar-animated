import { View, StyleSheet } from "react-native";
import XDate from "xdate";
import { memo, useCallback } from "react";
import { useCalendarContext } from "../calendarContext";
import { MonthGridWrapper } from "./grid";
import { MonthHeader } from "./header";

// Separate the context consumption to a wrapper component
export const MonthWrapper = memo(() => {
  const { updateYear, date: currentDate } = useCalendarContext();

  return <Month currentDate={currentDate} updateYear={updateYear} />;
});

// Make Month a pure component that doesn't use context
const Month = memo(
  ({
    currentDate,
    updateYear,
  }: {
    currentDate: XDate;
    updateYear: (year: number) => void;
  }) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const goToPrevYear = useCallback(() => {
      updateYear(currentYear - 1);
    }, [currentYear, updateYear]);

    const goToNextYear = useCallback(() => {
      updateYear(currentYear + 1);
    }, [currentYear, updateYear]);

    return (
      <View style={[styles.container]}>
        <MonthHeader
          currentYear={currentYear}
          goToNextYear={goToNextYear}
          goToPrevYear={goToPrevYear}
        />
        <MonthGridWrapper currentMonth={currentMonth} />
      </View>
    );
  }
);

MonthWrapper.displayName = "MonthWrapper";
Month.displayName = "Month";

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", borderRadius: 8 },
});
