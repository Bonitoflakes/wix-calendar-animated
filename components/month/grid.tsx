import { memo } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useCalendarContext } from "../calendarContext";

const _MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Separate context consumption in MonthGrid. This prevents re-renders when something changes in the context as the memo kicks in to compare
export const MonthGridWrapper = memo(({ currentMonth }: { currentMonth: number }) => {
  const { updateMonth, decrementStep } = useCalendarContext();

  return (
    <MonthGrid
      currentMonth={currentMonth}
      updateMonth={updateMonth}
      decrementStep={decrementStep}
    />
  );
});

const MonthGrid = memo(
  ({
    currentMonth,
    updateMonth,
    decrementStep,
  }: {
    currentMonth: number;
    updateMonth: (month: number) => void;
    decrementStep: () => void;
  }) => {
    return (
      <View style={[styles.gridContainer]}>
        {_MONTHS.map((month, idx) => {
          const isActive = currentMonth === idx;
          return (
            <Pressable
              key={idx}
              onPress={() => {
                updateMonth(idx);
                decrementStep();
              }}
              style={[styles.monthButton, isActive && styles.activeMonthButton]}
            >
              <Text style={[styles.monthText, isActive && styles.activeMonthText]}>
                {month}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }
);

MonthGrid.displayName = "MonthGrid";
MonthGridWrapper.displayName = "MonthGridWrapper";

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    paddingTop: 20,
  },
  monthButton: {
    minWidth: 84,
    alignItems: "center",
    padding: 10,
    flex: 1,
    borderRadius: 4,
  },
  monthText: {
    fontSize: 14,
    fontFamily: "Lato",
    color: "#52575C",
  },
  activeMonthText: {
    color: "#0466C8",
  },
  activeMonthButton: {
    backgroundColor: "#0466C833",
  },
});
