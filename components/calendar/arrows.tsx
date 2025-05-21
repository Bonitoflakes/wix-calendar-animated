import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import type { Direction } from "react-native-calendars/src/types";

type CustomArrowProps = {
  direction: Direction;
};

const CustomArrow = ({ direction }: CustomArrowProps) => {
  return direction === "left" ? (
    <Ionicons name="arrow-back" size={22} color="black" />
  ) : (
    <Ionicons name="arrow-forward" size={22} color="black" />
  );
};

export default React.memo(CustomArrow);
