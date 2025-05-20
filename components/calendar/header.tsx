import { Pressable, Text } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const XDate = require("xdate");

type THeader = {
  date: Date;
  toggleMonthModal: () => void;
};

export const CalendarHeader = ({ date, toggleMonthModal }: THeader) => {
  const formattedDate = new XDate(date);
  const title = formattedDate.toString("MMMM yyyy");
  return (
    <Pressable hitSlop={25} onPress={toggleMonthModal} accessibilityLabel="month-header">
      <Text>{title}</Text>
    </Pressable>
  );
};
