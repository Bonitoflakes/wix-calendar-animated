import { memo } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useCalendarContext } from "../calendarContext";
import Ionicons from "@expo/vector-icons/Ionicons";

type MonthHeaderProps = {
  currentYear: number;
  goToNextYear: () => void;
  goToPrevYear: () => void;
};

export const MonthHeader = memo(
  ({ currentYear, goToNextYear, goToPrevYear }: MonthHeaderProps) => {
    const { incrementStep } = useCalendarContext();

    const START_YEAR = 1970;
    const END_YEAR = 2100;

    return (
      <View style={[styles.headerContainer]}>
        <Pressable
          onPress={goToPrevYear}
          style={styles.headerArrow}
          disabled={currentYear === START_YEAR}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={currentYear === START_YEAR ? "#ccc" : "#222"}
          />
        </Pressable>

        <Pressable
          hitSlop={{ bottom: 10, left: 20, right: 20, top: 10 }}
          onPress={incrementStep}
          accessibilityLabel="year-header"
        >
          <Text style={styles.headerTitle}>{currentYear}</Text>
        </Pressable>

        <Pressable
          onPress={goToNextYear}
          style={styles.headerArrow}
          disabled={currentYear === END_YEAR}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={currentYear === END_YEAR ? "#ccc" : "#222"}
          />
        </Pressable>
      </View>
    );
  }
);

MonthHeader.displayName = "MonthHeader";

const styles = StyleSheet.create({
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
});
