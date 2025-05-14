import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const Step3: React.FC<Props> = ({ onNext, onBack }) => {
  return (
    <View>
      <Calendar />

      <View style={{ marginTop: 200 }}>
        <TouchableOpacity onPress={onBack} activeOpacity={0.8} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ececec",
    height: 48,
    borderRadius: 12,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "SpaceMonoBold",
  },
});
export default Step3;
