import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import XDate from "xdate";

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

type Props = {
  onBack: () => void;
  onNext: () => void;
  updateMonth: (month: number) => void;
  updateYear: (year: number) => void;
  currentDate: XDate;
};

const Month: React.FC<Props> = ({
  onBack,
  onNext,
  updateMonth,
  updateYear,
  currentDate,
}) => {
  const currentMonth = currentDate.getMonth();

  const goToPrevYear = () => {
    const newDate = new XDate(currentDate);
    newDate.setFullYear(currentDate.getFullYear() - 1);
    updateYear(newDate.getFullYear());
  };

  const goToNextYear = () => {
    const newDate = new XDate(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + 1);
    updateYear(newDate.getFullYear());
  };

  return (
    <View style={[styles.container]}>
      {/* Month Header */}
      <View style={[styles.headerContainer]}>
        <Pressable onPress={goToPrevYear}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>

        <Pressable
          hitSlop={{ bottom: 10, left: 20, right: 20, top: 10 }}
          onPress={() => onNext()}
          accessibilityLabel="year-header"
        >
          <Text>{currentDate.getFullYear()}</Text>
        </Pressable>

        <Pressable onPress={goToNextYear}>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </Pressable>
      </View>

      {/* Month Body */}
      <View style={[styles.bodyContainer]}>
        {_MONTHS.map((month, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              updateMonth(idx);
              onBack();
            }}
            style={[styles.monthButton, currentMonth === idx && styles.activeMonthButton]}
          >
            <Text>{month}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Month;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", width: "100%" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: 20,
    width: "100%",
  },
  bodyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 20,
    backgroundColor: "pink",
    justifyContent: "space-evenly",
  },
  monthButton: {
    minWidth: 100,
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#ececec",
  },
  activeMonthButton: {
    backgroundColor: "blue",
  },
});
