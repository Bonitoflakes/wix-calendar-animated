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
    <View style={{ backgroundColor: "white", width: "100%" }}>
      {/* Month Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          gap: 20,
          width: "100%",
        }}
      >
        <Pressable onPress={goToPrevYear}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>

        <Pressable
          hitSlop={{ bottom: 10, left: 20, right: 20, top: 10 }}
          onPress={() => {
            console.log("Log on Press year modal");
          }}
          accessibilityLabel="year-header"
        >
          <Text>{currentDate.getFullYear()}</Text>
        </Pressable>

        <Pressable onPress={goToNextYear}>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </Pressable>
      </View>

      {/* Month Body */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 20,
          gap: 20,
          backgroundColor: "pink",
          justifyContent: "space-evenly",
        }}
      >
        {_MONTHS.map((month, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              updateMonth(idx);
            }}
            style={{
              minWidth: 100,
              alignItems: "center",
              padding: 10,
              borderRadius: 12,
              backgroundColor: currentMonth === idx ? "blue" : "#ececec",
            }}
          >
            <Text>{month}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ marginTop: 100, padding: 20, flexDirection: "row", gap: 20 }}>
        <Pressable onPress={onBack} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable onPress={onNext} style={[styles.button, { backgroundColor: "pink" }]}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Month;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ececec",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginVertical: 20,
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
});
