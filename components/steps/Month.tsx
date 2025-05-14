import { View, Text, Pressable, StyleSheet } from "react-native";
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

type Props = {
  onBack: () => void;
  onNext: () => void;
};

const Month: React.FC<Props> = ({ onBack, onNext }) => {
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

      <View style={{ marginTop: 100, padding: 20, flexDirection: "row", gap: 20 }}>
        <Pressable onPress={onBack} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable onPress={onNext} style={[styles.button, { backgroundColor: "pink" }]}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Month;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ececec",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginVertical: 20,
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
});
