import { Calendar } from "@/packages/calendar";
import { useCalendar } from "@/packages/calendar/calendar-context";
import { View, Text } from "react-native";

export default function TabFourScreen() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 200,
      }}
    >
      <Text>
        Lot of gibberish Lot of gibberishLot of gibberishLot of gibberishLot of gibberish
        Lot of gibberish Lot of gibberish Lot of gibberish Lot of gibberish Lot of
        gibberish
      </Text>

      <Calendar.Root>
        <Calendar.Trigger pressableStyle={{ backgroundColor: "lightblue", margin: 20 }}>
          <MyText />
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

const MyText = () => {
  const { selectedDate } = useCalendar();

  if (!selectedDate) return <Text>dd-mm-yyyy</Text>;

  return <Text>Open Calendar: {selectedDate?.toString("dd-MM-yyyy")}</Text>;
};
