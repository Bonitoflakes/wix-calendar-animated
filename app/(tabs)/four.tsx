import { Calendar } from "@/packages/calendar";
import { View, Text } from "react-native";

export default function TabFourScreen() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 200,
      }}
    >
      <Calendar.Root>
        <Calendar.Trigger pressableStyle={{ backgroundColor: "lightblue", margin: 40 }}>
          <Text>Open Calendar</Text>
        </Calendar.Trigger>
        <Calendar.Modal>
          <Calendar.Content />
        </Calendar.Modal>
      </Calendar.Root>

      <Text>
        Lot of gibberish Lot of gibberishLot of gibberishLot of gibberishLot of gibberish
        Lot of gibberish Lot of gibberish Lot of gibberish Lot of gibberish Lot of
        gibberish
      </Text>
    </View>
  );
}
