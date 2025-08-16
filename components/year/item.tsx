import { Pressable, Text, StyleSheet } from "react-native";

type YearItemProps = {
  item: number;
  handleYearSelect: (year: number) => void;
  disabled: boolean;
  isActive: boolean;
};

export const YearItem: React.FC<YearItemProps> = ({
  item,
  handleYearSelect,
  disabled,
  isActive,
}) => {
  return (
    <Pressable
      style={[
        styles.yearButton,
        disabled && styles.yearButtonDisabled,
        isActive && styles.yearButtonActive,
      ]}
      onPress={() => !disabled && handleYearSelect(item)}
      disabled={disabled}
    >
      <Text
        style={[
          styles.yearText,
          disabled && styles.yearTextDisabled,
          isActive && styles.yearTextActive,
        ]}
      >
        {item}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  yearButton: {
    minWidth: 84,
    alignItems: "center",
    padding: 10,
    flex: 1,
    borderRadius: 4,
  },
  yearButtonActive: {
    backgroundColor: "#0466C833",
  },
  yearButtonDisabled: {
    backgroundColor: "#f5f5f5",
  },
  yearText: {
    fontSize: 16,
    color: "#222",
  },
  yearTextActive: {
    color: "#0466C8",
  },
  yearTextDisabled: {
    color: "#aaa",
  },
});
