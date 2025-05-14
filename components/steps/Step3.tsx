import { View, Text, Pressable, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const Step3: React.FC<Props> = ({ onNext, onBack }) => {
  return (
    <View>
      <Calendar />

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

export default Step3;

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
