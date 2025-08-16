import {
  StyleSheet,
  View,
  Button,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

import { MonthWrapper } from "@/packages/month";
import Year from "@/packages/year";
import { CalendarProvider, useCalendarContext } from "@/packages/calendarContext";
import { MyCalendar } from "@/packages/calendar";

export default function TabFourScreen() {
  const [isVisible, setIsVisible] = useState(false);

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
        <Button onPress={showModal} title="trigger" />
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
                flex: 1,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.3)",
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
      <Text>Selected Date: {selectedDate?.toString('dd-MM-yyyy')}</Text>
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
    backgroundColor: "green",
    padding: 20,
    width: "100%",
  },
  customHeaderTitle: {},
});
