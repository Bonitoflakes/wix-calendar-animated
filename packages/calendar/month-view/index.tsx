import { View, StyleSheet } from "react-native";
import { memo, useCallback } from "react";
import { useCalendar } from "../calendar-context";
import { MonthGridWrapper } from "./grid";
import { MonthHeader } from "./header";

// Separate the context consumption to a wrapper component
export const MonthView = memo(() => {
  const { updateDate, date: currentDate } = useCalendar();

  return <Month currentDate={currentDate} updateDate={updateDate} />;
});

// Make Month a pure component that doesn't use context
const Month = memo(
  ({
    currentDate,
    updateDate,
  }: {
    currentDate: Date;
    updateDate: (date: Date ) => void;
  }) => {
    const currentYear = currentDate.getFullYear();

    const goToPrevYear = useCallback(() => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      updateDate(newDate);
    }, [currentDate, updateDate]);

    const goToNextYear = useCallback(() => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(newDate.getFullYear() + 1);
      updateDate(newDate);
    }, [currentDate, updateDate]);

    return (
      <View style={[styles.container]}>
        <MonthHeader
          currentYear={currentYear}
          goToNextYear={goToNextYear}
          goToPrevYear={goToPrevYear}
        />
        <MonthGridWrapper />
      </View>
    );
  }
);

MonthView.displayName = "MonthView";
Month.displayName = "Month";

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", borderRadius: 8 },
});
