import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Modal as RNModal,
  TouchableWithoutFeedback,
  type ViewStyle,
} from "react-native";
import { CalendarProvider, useCalendar } from "./calendar-context";
import { DayView } from "./day-view";
import { MonthView } from "./month-view";
import { YearView } from "./year-view";

export const Root: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <CalendarProvider>{children}</CalendarProvider>;
};

export const Trigger: React.FC<{
  children: React.ReactNode;
  pressableStyle?: ViewStyle;
}> = ({ children, pressableStyle }) => {
  const { toggleIsOpen, updatePaddingTop } = useCalendar();
  return (
    <Pressable
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        ...pressableStyle,
      }}
      onPress={toggleIsOpen}
      onLayout={(e) => {
        console.log(e.nativeEvent.layout, "onLayout");
        updatePaddingTop(e.nativeEvent.layout.y);
      }}
    >
      {children}
    </Pressable>
  );
};

export const Modal: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isOpen, toggleIsOpen, paddingTop } = useCalendar();
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={toggleIsOpen}
    >
      <TouchableWithoutFeedback onPress={toggleIsOpen}>
        <View
          style={{
            padding: 20,
            paddingTop,
            flex: 1,
            width: "100%",
          }}
        >
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export const Content: React.FC = () => {
  const { step, isOpen } = useCalendar();

  if (!isOpen) return null;

  return (
    <View style={styles.content}>
      {step === 1 && <DayView />}
      {step === 2 && <MonthView />}
      {step === 3 && <YearView />}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
});
