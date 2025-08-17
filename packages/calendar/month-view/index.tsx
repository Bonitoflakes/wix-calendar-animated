import { View, StyleSheet } from "react-native";
import { memo, useCallback } from "react";
import { useCalendar } from "../calendar-context";
import { MonthGridWrapper } from "./grid";
import { MonthHeader } from "./header";
import { addYears, subYears } from "date-fns";

// Separate the context consumption to a wrapper component
export const MonthView = memo(() => {
  const { updateDraftDate, draftDate } = useCalendar();

  return <Month draftDate={draftDate} updateDraftDate={updateDraftDate} />;
});

// Make Month a pure component that doesn't use context
const Month = memo(
  ({
    draftDate,
    updateDraftDate,
  }: {
    draftDate: Date;
    updateDraftDate: (date: Date) => void;
  }) => {
    const currentYear = draftDate.getFullYear();

    const goToPrevYear = useCallback(() => {
      const newDate = subYears(draftDate, 1);
      updateDraftDate(newDate);
    }, [draftDate, updateDraftDate]);

    const goToNextYear = useCallback(() => {
      const newDate = addYears(draftDate, 1);
      updateDraftDate(newDate);
    }, [draftDate, updateDraftDate]);

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
