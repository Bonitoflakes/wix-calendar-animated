import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

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

const Month = () => {
  return (
    <View>
      {/* Month Header */}
      <View>
        <Pressable>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>

        <Pressable
          hitSlop={{ bottom: 10, left: 20, right: 20, top: 10 }}
          onPress={() => {
            console.log("Log on Press year modal");
          }}
          accessibilityLabel="year-header"
        >
          <Text>2025</Text>
        </Pressable>

        <Pressable>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </Pressable>
      </View>
      {/* Month Body */}
      <View>
        {_MONTHS.map((month, idx) => (
          <Pressable key={idx} onPress={() => {}}>
            <Text>{month}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Month;
