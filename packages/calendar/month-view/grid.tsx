import { memo } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useCalendar } from "../calendar-context";

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
export const MonthGridWrapper = memo(() => {
  const { updateDate, decrementStep, date } = useCalendar();

  return (
    <MonthGrid currentDate={date} updateDate={updateDate} decrementStep={decrementStep} />
  );
});

type MonthGridProps = {
  currentDate: Date;
  updateDate: (date: Date) => void;
  decrementStep: () => void;
};

const MonthGrid = memo(({ currentDate, updateDate, decrementStep }: MonthGridProps) => {
  return (
    <View style={[styles.gridContainer]}>
      {_MONTHS.map((month, idx) => {
        const isActive = currentDate.getMonth() === idx;

        return (
          <Pressable
            key={idx}
            onPress={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(idx);
              updateDate(newDate);
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
});

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
