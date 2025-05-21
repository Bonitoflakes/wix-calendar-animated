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
        <Pressable onPress={goToPrevYear} style={styles.headerArrow}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </Pressable>

        <Pressable
          hitSlop={{ bottom: 10, left: 20, right: 20, top: 10 }}
          onPress={() => onNext()}
          accessibilityLabel="year-header"
        >
          <Text style={styles.headerTitle}>{currentDate.getFullYear()}</Text>
        </Pressable>

        <Pressable onPress={goToNextYear} style={styles.headerArrow}>
          <Ionicons name="arrow-forward" size={22} color="black" />
        </Pressable>
      </View>

      {/* Month Body */}
      <View style={[styles.bodyContainer]}>
        {_MONTHS.map((month, idx) => {
          const isActive = currentMonth === idx;
          return (
            <Pressable
              key={idx}
              onPress={() => {
                updateMonth(idx);
                onBack();
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
    </View>
  );
};

export default Month;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white", borderRadius: 8 },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
  },
  headerArrow: {
    backgroundColor: "#F2F2F5",
    padding: 0,
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: 700,
  },
  bodyContainer: {
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
