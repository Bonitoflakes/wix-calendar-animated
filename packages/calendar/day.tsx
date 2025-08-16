import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { type DateData } from "react-native-calendars";
import { type BasicDayProps } from "react-native-calendars/src/calendar/day/basic";

export type CustomDayProps = BasicDayProps & {
  date?: DateData;
};

const CustomDay = (props: CustomDayProps) => {
  //   console.log("🚀🚀🚀 ~ CustomDay ~ props:", props);

  const { state, marking, date, onPress, accessibilityLabel, testID } = props;

  const isSelected = marking?.selected;

  const handleDayPress = () => onPress && onPress(date);

  return (
    <Pressable
      testID={testID}
      onPress={handleDayPress}
      accessibilityLabel={accessibilityLabel}
      style={[styles.container, isSelected && styles.selectedContainer]}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>{date?.day}</Text>
      {state === "today" && <View style={styles.today} />}
    </Pressable>
  );
};

export default React.memo(CustomDay);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#F2F2F5",
    overflow: "hidden",
  },
  selectedContainer: {
    backgroundColor: "#0400D1",
  },
  text: {
    color: "#52575C",
    fontFamily: "Poppins-regular",
    fontSize: 14,
  },
  selectedText: {
    color: "white",
  },
  today: {
    transform: [{ rotate: "45deg" }],
    top: -7,
    right: -8,
    width: 15,
    height: 15,
    backgroundColor: "#FF791F",
    position: "absolute",
  },
});
