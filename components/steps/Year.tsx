import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

const Year: React.FC<Props> = ({ onBack, onNext }) => {
  return (
    <View>
      <Text>Year</Text>

      <View style={{ marginTop: 100, padding: 20, flexDirection: "row", gap: 20 }}>
        <Pressable onPress={onBack} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Year;

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
