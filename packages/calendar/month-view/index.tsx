import { View, StyleSheet } from "react-native";
import { memo, useCallback } from "react";
import { useCalendar } from "../calendar-context";
import { MonthGridWrapper } from "./grid";
import { MonthHeader } from "./header";

// Separate the context consumption to a wrapper component
export const MonthView = memo(() => {
  const { updateInternalDate, internalDate } = useCalendar();

  return <Month internalDate={internalDate} updateInternalDate={updateInternalDate} />;
});

// Make Month a pure component that doesn't use context
const Month = memo(
  ({
    internalDate,
    updateInternalDate,
  }: {
    internalDate: Date;
    updateInternalDate: (date: Date) => void;
  }) => {
    const currentYear = internalDate.getFullYear();

    const goToPrevYear = useCallback(() => {
      const newDate = new Date(internalDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      updateInternalDate(newDate);
    }, [internalDate, updateInternalDate]);

    const goToNextYear = useCallback(() => {
      const newDate = new Date(internalDate);
      newDate.setFullYear(newDate.getFullYear() + 1);
      updateInternalDate(newDate);
    }, [internalDate, updateInternalDate]);

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
