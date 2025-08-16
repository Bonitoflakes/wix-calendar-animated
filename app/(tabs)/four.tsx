import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useState } from "react";

import { MonthWrapper } from "@/packages/month";
import Year from "@/packages/year";
import { CalendarProvider, useCalendarContext } from "@/packages/calendarContext";
import { MyCalendar } from "@/packages/calendar";

export default function TabFourScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [paddingTop, setPaddingTop] = useState(0);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const closeModal = () => {
    console.log("closeModal");
    setIsVisible(false);
  };

  const showModal = () => {
    console.log("showModal");
    setIsVisible(true);
  };

  return (
    <CalendarProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: "pink",
          paddingTop: 200,
        }}
      >
        <Pressable
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: 1,
            width: "100%",
          }}
          onPress={showModal}
          onLayout={(e) => {
            console.log(e.nativeEvent.layout, "onLayout");
            setPaddingTop(e.nativeEvent.layout.y);
          }}
        >
          <Text style={{ fontSize: 20 }}>Trigger</Text>
        </Pressable>

        <DateIndicator />
        <Text>
          Lot of gibberish Lot of gibberishLot of gibberishLot of gibberishLot of
          gibberish Lot of gibberish Lot of gibberish Lot of gibberish Lot of gibberish
          Lot of gibberish
        </Text>
        <Modal
          visible={isVisible}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View
              style={{
                padding: 20,
                paddingTop,
                flex: 1,
                width: "100%",
                // backgroundColor: "rgba(0,0,0,0.3)",
              }}
            >
              <Shell closeModal={closeModal} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </CalendarProvider>
  );
}

const DateIndicator = () => {
  const { selectedDate } = useCalendarContext();
  return (
    <View>
      <Text>Selected Date: {selectedDate?.toString("dd-MM-yyyy")}</Text>
    </View>
  );
};

const Shell = ({ closeModal }: { closeModal: () => void }) => {
  const { step } = useCalendarContext();
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {step === 1 && <MyCalendar closeModal={closeModal} />}
        {step === 2 && <MonthWrapper />}
        {step === 3 && <Year />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "green",
    // padding: 20,
    borderRadius: 8,
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  customHeaderTitle: {},
});
